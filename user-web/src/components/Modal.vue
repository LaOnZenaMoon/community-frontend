<template>
    <v-dialog
        v-model="isOpen"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
    >
        <v-card>
            <v-toolbar
                flat
                dark
                color="grey"
            >
                <slot name="header">
                    <v-btn
                        icon
                        dark
                        @click="close()"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title v-text="title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            dark
                            text
                            @click="close()"
                        >
                            Save
                        </v-btn>
                    </v-toolbar-items>
                    <v-menu
                        bottom
                        right
                        offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                dark
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>1</v-list-item-title>
                                <v-list-item-title>2</v-list-item-title>
                                <v-list-item-title>3</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </slot>
            </v-toolbar>
            <v-card-text>
                <slot name="body">
                </slot>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: [
        'isOpen',
        'title'
    ],
    data() {
        return {
            dialog: false,
            dialog2: false,
            notifications: false,
            sound: true,
            widgets: false,
        }
    },
    methods: {
        close() {
            this.$emit('closeModal')
        }
    },
}
</script>

<style scoped>

</style>
