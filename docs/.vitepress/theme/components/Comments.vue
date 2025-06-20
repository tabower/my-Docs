<script setup lang="ts">
import { useData } from 'vitepress'

const { title } = useData()
</script>

<template>
  <div :key="title" class="giscus">
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="tabower/my-Docs"
      data-repo-id="R_kgDOO-GrSw"
      data-category="General"
      data-category-id="DIC_kwDOO-GrS84Crv0n"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-lang="en"
      data-theme="preferred_color_scheme"
      data-loading="lazy"
      async
    />
  </div>
</template>