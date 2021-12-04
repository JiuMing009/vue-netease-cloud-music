<template>
    <div class="search">
        <el-table :data="songs" stripe style="width: 100%" @row-dblclick="playMusic">
            <el-table-column type="index" width="50" align="center">
            </el-table-column>
            <el-table-column prop="name" label="音乐标题" width="621">
            </el-table-column>
            <el-table-column prop="artists[0].name" label="歌手" width="300">
            </el-table-column>
            <el-table-column prop="album.name" label="专辑" width="450">
            </el-table-column>
            <el-table-column prop="duration" label="时长">
                <template slot-scope="scope">{{scope.row.duration|timeForm}}</template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props:['searchVal'],
    data() {
        return {
            keywords:"",
            songs: [],
        };
    },
    methods: {
        /* 搜索歌曲 */
        getSong() {
            const _this = this;
            this.getRequest("/search?keywords=" + this.searchVal)
                .then((resp) => {
                    console.log(resp);
                    _this.songs = resp.result.songs;
                    console.log(resp.result.songs);
                })
                .catch((error) => {});

        },
        playMusic(row) {
            console.log(row.id);
            /* 向组件传值 */
            this.$emit('getMusic', row.id);
        },
    },
    filters: {
        timeForm(val) {
            let m = parseInt((val % (1000 * 60 * 60)) / (1000 * 60));
            let s = parseInt((val % (1000 * 60)) / 1000);
            if (m < 10) {
                m = "0" + m;
            }
            if (s < 10) {
                s = "0" + s;
            }
            return m + ":" + s;
        },
    },
    mounted() {
        this.keywords = this.$route.query.keywords;
        this.getSong();
        
    },
    created() {
        
    },
    watch:{
        searchVal:function(){
           this.getSong()
        }
    }
    
};
</script>

<style scoped>
.search {
    overflow-y: scroll;
    height: 100%;
    padding: 0 20px;
}
.search /deep/ .el-table__header th, .el-table__header tr{
    color: #000;
}
.search /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td{
    background: #F0F1F2;
    
}

.search /deep/ .el-table__row--striped {
    background: #ccc;
}
</style>