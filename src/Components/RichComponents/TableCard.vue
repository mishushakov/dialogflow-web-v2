<template>
    <div class="table-card">
        <img class="table-card-image" v-if="imageUri" :src="imageUri" :alt="imageTitle" />
        <div class="table-card-content">
            <div class="table-card-title" v-if="title">{{title}}</div>
            <div class="table-card-subtitle" v-if="subtitle">{{subtitle}}</div>
        </div>
        <div class="table-card-scrollable">
            <table class="table-card-table" cellspacing="0" cellpadding="0">
                <tr>
                    <th v-for="head in header">{{head.header}}</th>
                </tr>
                <tr v-for="row in rows">
                    <td v-for="cell in row.cells">{{cell.text}}</td>
                </tr>
            </table>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="sass" scoped>
.table-card
    padding: 16px
    border-radius: 12px
    background-color: var(--component-background)
    box-shadow: var(--shadow)

.table-card-title
    font-weight: 500
    font-size: 20px
    line-height: 30px
    color: var(--text)

.table-card-subtitle
    line-height: 24px
    color: var(--text-subtitle)

.table-card-content
    display: inline-block
    vertical-align: top
    margin-top: 2.5px
    max-width: 70%

.table-card-image
    border-radius: 12px
    height: 50px
    width: 50px
    object-fit: cover
    margin-left: 16px
    float: right
    background-color: var(--image-background)

.table-card-scrollable
    white-space: nowrap
    overflow: scroll

.table-card-table
    width: 100%
    padding-bottom: 16px

.table-card-table th
    text-align: left
    padding-top: 8px
    padding-bottom: 8px
    border-bottom: 1px solid var(--border)
    color: var(--text)
    font-size: 18px
    font-weight: 500

.table-card-table td
    padding-top: 16px
    padding-right: 16px
    padding-bottom: 16px
    border-bottom: 1px solid var(--border)
    color: var(--text-secondary)
    font-size: 14px
</style>

<script>
export default {
    name: 'table-card',
    props: ['title', 'subtitle', 'imageUri', 'imageTitle', 'header', 'rows']
}
</script>