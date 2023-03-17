<template>
    <div>{{ message }}</div>
</template>
<script>
export default {
    name: 'McvErrorMessage',
    props: {
        message: {
            type: String,
            required: false,
            default: 'Somethings wen wrong'
        }
    }
}
</script>