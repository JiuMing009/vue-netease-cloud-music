<template>
    <div class="gedan">
        <el-row>
            <el-col :span="3">
                <div class="img">
                    <img :src="playlist.coverImgUrl" width="184" height="184">
                </div>
            </el-col>
            <el-col :span="19">
                <div class="name">
                    <h1>{{playlist.name}}</h1>
                </div>

                <div class="creator">
                    <img :src="playlist.creator.avatarUrl" width="25" height="25" alt="">
                    <span class="username">{{playlist.creator.nickname}}</span>
                    <span class="time">{{playlist.createTime | dateFormat}}创建</span>
                </div>

                <div class="btn">
                    <el-button type="danger" round size="small" @click="playAll"><i class="el-icon-caret-right"></i>播放全部</el-button>
                    <el-button plain round size="small"><i class="el-icon-folder-add"></i>收藏</el-button>
                    <el-button plain round size="small"><i class="el-icon-share"></i>分享({{playlist.shareCount}})</el-button>
                    <el-button plain round size="small"><i class="el-icon-download"></i>全部下载</el-button>
                </div>

                <div class="tag">
                    <ul>
                        <li style="color:#000">标签:</li>
                        <li v-for="item in playlist.tags" :key="item">{{item}}<span style="margin:0 5px;">/</span></li>
                    </ul>
                </div>

                <div class="bofan">
                    <span>播放: {{playlist.playCount}}</span>
                </div>

                <div class="jianjie">
                    <span>简介: {{playlist.description}}</span>
                </div>
            </el-col>

            <el-table :data="playlist.tracks" stripe style="width: 100%" @row-dblclick="playMusic">
                <el-table-column type="index" width="50" align="center">
                </el-table-column>
                <el-table-column prop="name" label="音乐标题" width="621">
                </el-table-column>
                <el-table-column prop="ar[0].name" label="歌手" width="300">
                </el-table-column>
                <el-table-column prop="al.name" label="专辑" width="450">
                </el-table-column>
                <el-table-column prop="dt" label="时长">
                    <template slot-scope="scope">{{scope.row.dt | timeForm}}</template>
                </el-table-column>
            </el-table>
        </el-row>

    </div>
</template>

<script>
export default {
    name: "Test",
    created() {},
    data() {
        return {
            playlist: {},
        };
    },
    props: {},
    methods: {
        getGedan() {
            const _this = this;
            this.getRequest("/playlist/detail?id=" + this.$route.query.id).then(
                (resp) => {
                    console.log(resp);
                    _this.playlist = resp.playlist;
                }
            );
        },
        playMusic(row) {
            console.log(row.id);
            /* 向组件传值 */
            this.$emit('getMusic', row.id);
        },
        playAll(){
            window.localStorage.setItem("songList",this.playlist)
        }
    },
    created() {
        this.getGedan();
    },

    filters: {
        dateFormat(time) {
            const dt = new Date(time);
            const y = dt.getFullYear();
            const m = (dt.getMonth() + 1 + "").padStart(2, "0");
            const d = (dt.getDate() + "").padStart(2, "0");
            return `${y}-${m}-${d}`;
        },
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
};
</script>

<style scoped>
.gedan {
    margin: 20px;
}
.gedan .img img {
    border-radius: 5px;
}
.name h1 {
    font-size: 24px;
}
.creator {
    display: flex;
    align-items: center;
}
.creator img {
    border-radius: 50%;
    margin: 5px;
}
.creator .username {
    font-size: 12px;
    color: #507daf;
}
.creator .time {
    margin-left: 10px;
    font-size: 14px;
}
.btn {
    margin: 10px;
}
.btn .el-button {
    font-size: 15px;
}
.btn i {
    font-size: 17px;
    margin-right: 6px;
}
.tag {
    font-size: 14px;
}
.tag ul {
    list-style: none;
}
.tag ul li {
    float: left;
    color: #507daf;
    margin-left: 5px;
    font-size: 14px;
}
.bofan {
    clear: both;
    margin-left: 5px;
    font-size: 14px;
}
.jianjie {
    margin-left: 5px;
    font-size: 14px;
}
.jianjie span {
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>