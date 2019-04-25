<template>
    <span class="bubble" :class="{'me': from == 'me'}">
        {{text}}
    </span>
</template>

<style lang="sass" scoped>
.bubble
    padding: 12px
    border-radius: 40px
    color: #202124
    border: 1px solid #E8EAED
    display: inline-block
    position: relative
    background-color: white

    &::before
        content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyOHB4IiB2aWV3Qm94PSIwIDAgMjQgMjgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjQuMDAwMDAwLCAtMTAxLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4wMDAwMDAsIDEwMS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLjUsMS4yMTMzNzE0OCBDMC41LDcuNjA2NjkwNjcgMC41LDguNzU1Nzk0NzggMC41LDI2LjkzMjQ3OTIgTDIyLjU4NjkzMDIsOC41MjY3MDQwNCBDMTMuMDQwODkxNSw4LjU4NTgzODUzIDUuNjY5NjIyMDQsNi4xNTI1ODA2MyAwLjUsMS4yMTMzNzE0OCBaIiBzdHJva2U9IiNFOEVBRUQiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSIxIDkgMjQgOSAxIDI4Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==")
        position: absolute
        left: 0
        top: 0
        margin-top: -9px
        margin-left: -1px

    &.me
        float: right
        background-color: #F1F3F4
        border: 1px solid #F1F3F4
        color: #5F6368
        margin-top: 24px

        &::before
            content: ''

        &::after
            content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzNweCIgaGVpZ2h0PSIyOHB4IiB2aWV3Qm94PSIwIDAgMzMgMjgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzU1LjAwMDAwMCwgLTE2NS4wMDAwMDApIiBmaWxsPSIjRjFGM0Y0Ij4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDE2NS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNTUsMCBDMzU1LDMgMzU1LDEyLjMzMzMzMzMgMzU1LDI4IEwzODgsOCBDMzczLjMzMzMzMyw4LjMzMzMzMzMzIDM2Mi4zMzMzMzMsNS42NjY2NjY2NyAzNTUsMCBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzEuNTAwMDAwLCAxNC4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTM3MS41MDAwMDAsIC0xNC4wMDAwMDApIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==")
            position: absolute
            right: 0
            top: 0
            margin-top: -9px
            margin-right: -1px
</style>

<script>
export default {
    name: 'Bubble',
    props: ['text', 'from']
}
</script>
