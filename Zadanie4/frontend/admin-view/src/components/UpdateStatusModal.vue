<template>
    <div class="modal fade" id="updateStatusModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       
        <div class="modal-dialog" role="document">
            {{ this.$props.order_id }}
            {{ newStatus }}
            <div class="modal-content" >
            <div class="modal-body">
                <div class="form-group">
                    <label for="newStatus">New category : </label>
                    <select class="form-select" v-model.trim="newStatus" id="newStatus" >
                        <option selected></option>
                        <option v-for="status in this.$props.statuses" :key="status">
                            {{ status.status_name }}
                        </option>
                    </select>
                    <div v-if="this.state === 'EMPTY_STATUS'" class="alert alert-danger">Empty new state</div>
                    <div v-if="this.state === 'ERROR'" class="alert alert-danger">{{ this.message }}</div>
                    <div v-if="this.state === 'SUCCESS'" class="alert alert-success">Changes submitted</div>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="this.state = ''" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="submitChanges()">Save changes</button>
            </div>
            </div>
        </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'UpdateStatusModal.vue',
    props: ['order_id', 'statuses'],
    data() {
        return {
            newStatus: '',
            state: '',
            message: ''
        }
    },
    methods: {
        submitChanges() {
            if (this.newStatus != null && this.newStatus != '') {
                axios.put(`${this.API_URL}/orders/${this.$props.order_id}/${this.getStatusId().id}`)
                .then((res) => {
                    setTimeout(() => { this.$router.go() }, 1000);
                    this.state = "SUCCESS"
                    this.message = res.data.message;
                }).catch((error) => {
                    this.state = "ERROR";
                    this.message = error.response.data.message;
                })
            } else {
                this.state = "EMPTY_STATUS";
            }
        },
        getStatusId() {
            return this.$props.statuses.find((status) => {
                return this.newStatus === status.status_name
            })
        }

    }
}
</script>

<style scoped>
    .alert { 
        text-align: center;
        margin-top: 5px;
    }
</style>