<template>
    <div class="rich-table-card">
        <div class="rich-table-card-head">
            <div class="rich-table-info">
                <div v-if="title" class="rich-table-card-title">{{title}}</div>
                <div v-if="subtitle" class="rich-table-card-subtitle">{{subtitle}}</div>
            </div>
            <img v-if="imageUri" class="rich-table-card-image" :src="imageUri" :alt="imageTitle">
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
        <div :class="{'rich-table-actions': $slots.default}"><slot /></div>
    </div>
</template>

<style lang="sass" scoped>
.rich-table-card
    padding: 16px
    border-radius: 12px
    background-color: var(--background-component)
    box-shadow: var(--shadow)

.rich-table-card-title
    font-size: 20px
    line-height: 30px
    color: var(--text-title)

.rich-table-card-subtitle
    line-height: 24px
    color: var(--text-subtitle)

.rich-table-card-head
    display: flex
    margin-top: 2.5px
    align-items: flex-start

.rich-table-info
    flex: 1

.rich-table-card-image
    border-radius: 12px
    height: 50px
    width: 50px
    object-fit: cover
    margin-left: 16px
    float: right
    background-color: var(--background-image)

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
        border-bottom: var(--border)
        color: var(--text-secondary)
        font-size: 14px
        font-weight: inherit

    td
        padding-top: 16px
        padding-bottom: 16px
        border-bottom: var(--border)
        color: var(--text-title)
        font-size: 14px

    tr:last-child td
        padding-bottom: 0
        border-bottom: 0

.rich-table-actions
    padding-top: 16px
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
