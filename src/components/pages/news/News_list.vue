<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-menu"></i> 新闻</el-breadcrumb-item>
                <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" class="add-button" @click="addButtonClick" v-if="addClickPath">创建</el-button>
        </div>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="newsTitle" label="标题" min-width="25%">
            </el-table-column>
            <!-- <el-table-column prop="createTime" label="创建时间" sortable min-width="25%">
            </el-table-column> -->
            <el-table-column prop="createUser" label="创建人" min-width="25%">
            </el-table-column>
            <el-table-column label="操作" min-width="25%">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="newsSum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getNews, deleteNewsInfo } from "../../../api/news.js"
export default {
    data() {
        return {
            addClickPath: 'news_add',
            tableData: [],
            cur_page: 1,
            newsSum: 0
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
        addButtonClick() {
            this.$router.push(this.addClickPath)
        },
        getData(pageSize, pageNo) {
            let _this = this;
            getNews(pageSize, pageNo).then(res => {
                // console.log(res)
                this.newsSum = res.data.newsSum;
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
            this.$store.dispatch('setNews', row)
            this.$router.push({ path: `news_add?edit=Y` })
        },
        handleDelete(index, row) {
            this.$confirm('确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteNewsInfo(row.newsId).then(res => {
                    if (res.success) {
                        this.getData(10, this.cur_page)
                        this.$message.success('删除成功')
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch(err => {
                    this.$message.error('删除失败')
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    },
    components: {
    }
}
</script>