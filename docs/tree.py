import os
import json
from pathlib import Path

def generate_vitepress_sidebar(dirs_to_scan):
    sidebar_config = {}

    for base_dir in dirs_to_scan:
        if not os.path.exists(base_dir):
            continue

        sidebar_items = []
        dir_path = Path(base_dir)

        # 处理当前目录的 index.md
        index_file = dir_path / "index.md"
        if index_file.exists():
            sidebar_items.append({
                "text": "Index",
                "link": f"{base_dir}/index"
            })

        # 遍历子目录
        for entry in sorted(os.scandir(base_dir), key=lambda x: x.name):
            if entry.name.startswith('.') or entry.name == "index.md":
                continue

            if entry.is_dir():
                subdir = dir_path / entry.name
                sub_items = []

                # 检查子目录是否有 index.md
                sub_index = subdir / "index.md"
                has_index = sub_index.exists()

                # 收集子目录中的 Markdown 文件
                for sub_entry in sorted(os.scandir(subdir), key=lambda x: x.name):
                    if sub_entry.is_file() and sub_entry.name.endswith('.md') and sub_entry.name != "index.md":
                        text = sub_entry.name[:-3].replace('_', ' ')
                        sub_items.append({
                            "text": text,
                            "link": f"{base_dir}/{entry.name}/{sub_entry.name[:-3]}"
                        })

                # 添加到侧边栏
                if sub_items or has_index:
                    dir_entry = {
                        "text": entry.name.capitalize(),
                        "link": f"{base_dir}/{entry.name}/index" if has_index else None,
                    }
                    if sub_items:
                        dir_entry["items"] = sub_items
                    sidebar_items.append(dir_entry)

            elif entry.is_file() and entry.name.endswith('.md'):
                text = entry.name[:-3].replace('_', ' ')
                sidebar_items.append({
                    "text": text,
                    "link": f"{base_dir}/{entry.name[:-3]}"
                })

        sidebar_config[f"/{base_dir}/"] = sidebar_items

    return sidebar_config

if __name__ == "__main__":
    # 配置要扫描的目录（可自定义）
    dirs_to_scan = ["docs", "notes"]
    sidebar = generate_vitepress_sidebar(dirs_to_scan)
    
    # 输出时添加 'sidebar:' 前缀和末尾逗号
    print("sidebar: " + json.dumps(sidebar, indent=2, ensure_ascii=False) + ",")