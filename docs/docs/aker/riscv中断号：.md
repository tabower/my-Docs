riscv中断号：

arch/riscv/include/asm/csr.h

\#define IRQ_S_TIMER   5

\# define RV_IRQ_TIMER  IRQ_S_TIMER



drivers/clocksource/timer-riscv.c

riscv_clock_event_irq = irq_create_mapping(domain, RV_IRQ_TIMER);





```c
#0  hrtimer_interrupt (dev=0xff60000007fdf540) at kernel/time/hrtimer.c:1859
#1  0xffffffff80852a36 in riscv_timer_interrupt (irq=<optimized out>, dev_id=<optimized out>)
    at drivers/clocksource/timer-riscv.c:152
#2  0xffffffff80088560 in handle_percpu_devid_irq (desc=0xff600000020f6e00)
    at ./arch/riscv/include/asm/current.h:31
#3  0xffffffff80082eda in generic_handle_irq_desc (desc=0xff600000020f6e00) at ./include/linux/irqdesc.h:173
#4  handle_irq_desc (desc=0xff600000020f6e00) at kernel/irq/irqdesc.c:700
#5  0xffffffff80082f74 in generic_handle_domain_irq (domain=<optimized out>, hwirq=hwirq@entry=5)
    at kernel/irq/irqdesc.c:756
#6  0xffffffff8054bd5c in riscv_intc_irq (regs=<optimized out>) at drivers/irqchip/irq-riscv-intc.c:33
#7  0xffffffff80a8a9de in handle_riscv_irq (regs=0xff20000000063be0) at arch/riscv/kernel/traps.c:389
#8  0xffffffff80a958e6 in call_on_irq_stack () at arch/riscv/kernel/entry.S:360
```



