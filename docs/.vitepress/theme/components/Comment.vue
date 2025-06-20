<script setup lang="ts">
import { ref, onMounted } from 'vue'

const commentRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!commentRef.value) {
    console.warn('Comments won\'t load because the commentRef element is null.')
    return
  }

  try {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', 'tabower/my-Docs')
    script.setAttribute('issue-term', 'pathname') // 修改为 pathname 更可靠
    script.setAttribute('label', 'comment') // 使用小写更符合规范
    script.setAttribute('theme', 'preferred-color-scheme')
    
    commentRef.value.appendChild(script)
  } catch (error) {
    console.error('Comments loading failed.', error)
  }
})
</script>

<template>
  <div ref="commentRef" class="utterances-comments" />
</template>

<style scoped>
.utterances-comments {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>