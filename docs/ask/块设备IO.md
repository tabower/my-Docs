# 块设备IO

本文主要讨论该小内核的块设备IO的一个大概框架。

> 本节相关的代码位于
>
> `kernel/dev/blk/*`
>
> `include/dev/blk/*`





## 1. 整体框架

首先我们来看看整个内核跟块设备有关的的一个大体架构：

<img src="https://r2-pub.tbw.wiki/piclist/2025/06/0e4e4a818c16b211ea8a8a67b24e3014.png" alt="image-20250621214729458" style="zoom:40%;" />

这张图想必对于绝大多数人应该都会感觉很简单。

我们需要实现块设备的IO操作，与之相关联的有这三个：

- `Gendisk`：负责块设备的统一管理框架；
- `Block Buffer`：块设备 buffer；
- `Driver`：底层的设备驱动；



具体的读写IO框架呢，如下所示：

<img src="https://r2-pub.tbw.wiki/piclist/2025/06/bf243f77749831cec3809c8f37f48faf.png" alt="image-20250621230053211" style="zoom:50%;" />



图片有些凌乱，我们直接给出读、写、同步磁盘的步骤如下：

### 1.1 读

1. 用户生成请求
2. 用户唤醒`start_io`线程处理
3. 在该请求上睡眠，等待完成（代码中使用信号量避免了唤醒丢失问题）
4. `start_io`查缓存，若有，则复制后返回，否则继续
5. 使用驱动注册提供的直接接口读（位于`gendisk->ops->ll_rw`）
6. 数据加入缓存
7. 复制数据给提供的区域并唤醒用户
8. 结束

### 1.2 写

1. 用户生成请求
2. 用户唤醒`start_io`线程处理
3. 在该请求上睡眠，等待完成
4. `start_io`写入缓冲区，标记脏
5. 唤醒用户
6. 结束

### 1.3 同步回磁盘

1.  `flush`线程定期被唤醒
2. 遍历直接刷写脏链缓存（使用驱动注册提供的直接接口写）
3. 睡眠，等待下一次唤醒




## 2. Gindisk

本层主要负责处理块设备的统一管理。

先上菜：

```c
// include/dev/blk/gendisk.h
struct gendisk_operations
{
    int (*open)(struct gendisk *gd, mode_t mode);    // 打开设备
    int (*release)(struct gendisk *gd, mode_t mode); // 关闭设备
    int (*start_io)(struct gendisk *gd);             // 执行I/O操作，由一个专门线程负责
    uint64_t (*disk_size)(struct gendisk *gd);         // 获取设备大小

    int (*ll_rw)(struct gendisk *gd, struct bio *bio, uint32_t rw); // 设备底层次的读写操作

    // 读写操作，只是创建对应的 bio 后挂载到请求队列上
    int (*read)(struct gendisk *gd, uint32_t blockno, uint32_t offset, uint32_t len, void *vaddr);
    int (*write)(struct gendisk *gd, uint32_t blockno, uint32_t offset, uint32_t len, void *vaddr);
};

// 通用块
struct gendisk
{
    struct block_device *dev;
        struct request_queue queue; // 请求队列

    struct gendisk_operations ops;

    struct bhash_struct bhash;        // 缓存哈希
    struct thread_info *io_thread;    // 专门负责处理这个设备IO的线程
    struct thread_info *flush_thread; // 专门负责处理这个设备 flush 的线程
};
```

通过代码可以看出，我们实现的`Gindisk`主要负责有：

- 处理请求队列
- 设备操作方法
- 设备缓存
- Flush 同步

也就是说，每个设备都有自己独立的一套内存资源，包括请求队列、缓存管理、IO线程、Flush线程。



## 3. Block Buffer

没有什么好说的，仅仅是一个**哈希池 + 记录脏缓冲**而已。

```c
// include/dev/blk/buf.h
struct buf_head
{
    uint32_t blockno; // 起始块号
    hash_node_t bh_node;    // 哈希节点
    struct list_head lru;   // lru
    struct list_head dirty; // dirty_list
	...
};

struct bhash_struct
{
    struct gendisk *gd;
    struct hash_table buf_hash_table;

    // LRU2
    struct list_head active_list;
    struct list_head inactive_list;
	
    // dirty
    struct list_head dirty_list; // 脏链
};
```



## 4. Dirver

底层和具体设备打交道的玩意儿，由上层控制。

我们使用`Virtio.img`作为块设备。对应的驱动直接使用了[`xv6-riscv`](https://github.com/mit-pdos/xv6-riscv/blob/riscv/kernel/virtio_disk.c)照搬过来。
