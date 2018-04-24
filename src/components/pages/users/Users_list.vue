<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-menu"></i> 用户</el-breadcrumb-item>
                <el-breadcrumb-item>用户账号</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="createTime" label="创建时间" sortable width="150">
            </el-table-column>
            <el-table-column prop="name" label="创建人" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="userSum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import ls from '../../../utils/localStorage.js'
import { getUsers, deleteUser } from "../../../api/user.js"
export default {
    data() {
        return {
            tableData: [],
            cur_page: 0,
            userSum: 0
        }
    },
    created() {

        this.getData(10, 0);
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData(10, this.cur_page);
        },
        getData(pageSize, pageNo) {
            let _this = this;
            getUsers(pageSize, pageNo).then(res => {
                // console.log(res)
                this.userSum = res.data.userSum
                _this.tableData = res.data.list;
            })
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.$router.push({ path: 'Users_edit', query: { uid: row.userId } });
        },
        handleDelete(index, row) {
            const userId = row.userId;
            this.$confirm('确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteUser(userId).then(res => {
                    this.$message.success('删除成功');
                    this.getData(10, this.cur_page);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    }
}
</script>
<style>

</style>