<template>
    <div class="rich-table-card">
        <img v-if="imageUri" class="rich-table-card-image" :src="imageUri" :alt="imageTitle">
        <div class="rich-table-card-content">
            <div v-if="title" class="rich-table-card-title">{{title}}</div>
            <div v-if="subtitle" class="rich-table-card-subtitle">{{subtitle}}</div>
        </div>
        <div class="rich-table-card-scrollable">
            <table class="rich-table-card-table" cellspacing="0" cellpadding="0">
                <tr>
                    <th v-for="(head, head_id) in header" :key="head_id">{{head.header}}</th>
                </tr>
                <tr v-for="(row, row_id) in rows" :key="row_id">
                    <td v-for="(cell, cell_id) in row.cells" :key="cell_id">{{cell.text}}</td>
                </tr>
            </table>
        </div>
        <slot />
    </div>
</template>

<style lang="sass" scoped>
.rich-table-card
    padding: 16px
    border-radius: 12px
    background-color: var(--component-background)
    box-shadow: var(--shadow)

.rich-table-card-title
    font-weight: 500
    font-size: 20px
    line-height: 30px
    color: var(--text)

.rich-table-card-subtitle
    line-height: 24px
    color: var(--text-subtitle)

.rich-table-card-content
    display: inline-block
    vertical-align: top
    margin-top: 2.5px
    max-width: 70%

.rich-table-card-image
    border-radius: 12px
    height: 50px
    width: 50px
    object-fit: cover
    margin-left: 16px
    float: right
    background-color: var(--image-background)

.rich-table-card-scrollable
    white-space: nowrap
    overflow: scroll

.rich-table-card-table
    width: 100%
    padding-bottom: 16px

.rich-table-card-table
    th
        text-align: left
        padding-top: 8px
        padding-bottom: 8px
        border-bottom: 1px solid var(--border)
        color: var(--text)
        font-size: 18px
        font-weight: 500

    td
        padding-top: 16px
        padding-bottom: 16px
        border-bottom: 1px solid var(--border)
        color: var(--text-secondary)
        font-size: 14px

    tr:last-child td
        padding-bottom: 0
        border-bottom: 0
</style>

<script>
export default {
    name: 'RichTableCard',
    props: {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        },
        imageUri: {
            type: String,
            default: null
        },
        imageTitle: {
            type: String,
            default: null
        },
        header: {
            type: Array,
            default: null
        },
        rows: {
            type: Array,
            default: null
        }
    }
}
</script>
