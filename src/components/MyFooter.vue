<template>
    <el-row>
        <el-col :span="5">
            <div class="left">
                <img :src="music.al.picUrl" alt="" height="60" width="60" class="musicImg" @click="show">
                <div class="img-box"></div>
                <div class="song">
                    <p class="music">{{music.name}}</p>
                    <p class="songer">{{music.ar[0].name}}</p>
                </div>
            </div>
        </el-col>
        <el-col :span="14">
            <div class="c">
                <audio :src="musicUrl" ref="playMusicAudio" autoplay></audio>
                <el-row style="height: 35px; line-height: 35px" class="box">
                    <ul class="myImg">
                        <li class="sx"><img src="../assets/icon/上一首.png" alt="" width="16px" height="16px" /></li>
                        <li v-show="!isPlay"><img src="../assets/icon/播放.png" alt="" width="24px" height="24px" @click="playMusic()" /></li>
                        <li v-show="isPlay"><img src="../assets/icon/暂停.png" alt="" width="24px" height="24px" @click="playMusic()" /></li>
                        <li class="sx"><img src="../assets/icon/下一首.png" alt="" width="16px" height="16px" /></li>
                    </ul>
                </el-row>

                <el-row :gutter="24" style="text-algin:center">
                    <el-col :span="4" style="text-align: right;margin-top: 5px;"><span>{{Number(musicDuration) | timeFormat}}</span></el-col>
                    <el-col :span="16">
                        <el-slider v-model="musicDuration" :max="totalDuration" :show-tooltip="false" @change="musicTimeChange"></el-slider>
                    </el-col>
                    <el-col :span="4" style="text-align: left;margin-top: 5px;"><span>{{Number(totalDuration) | timeFormat}}</span></el-col>
                </el-row>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="right">
                <img src="../assets/icon/音量.png" alt="" width="24" height="24">

                <el-slider v-model="musicVolume" :show-tooltip="false" @change="musicVolumeChange">
                </el-slider>
                <img src="../assets/icon/列表.png" alt="" width="24" height="24" @click="getRecord">
            </div>
        </el-col>
        <el-drawer  :visible.sync="drawer" :with-header="false" size="23%" :modal="false">
            <el-table :data="allData" ref="playTable"  stripe
                      style="cursor: context-menu;" @row-dblclick="playRightMusicList">
                <el-table-column label="音乐标题" prop="name"></el-table-column>
                <el-table-column label="歌手" prop="ar[0].name"></el-table-column>
                <el-table-column label="时长" prop="dt" width="80px;"></el-table-column>

            </el-table>
        </el-drawer>
    </el-row>
</template>

<script>
export default {
    name: "Test",
    data() {
        return {
            drawer: false,
            uId:625203758,
            value1: 0,
            musicUrl: "",
            isPlay: false,
            //当前音乐的进度条
            musicDuration: 0,
            //总进度条
            totalDuration: 0,
            //当前音乐的id
            curId: 0,
            musicVolume: 20,
            music: {
                name:'',
                al: {
                    name: "",
                    picUrl: "",
                },
                /* 作者 */
                ar: [
                    {
                        name: "",
                    },
                ],
            },

            /* 用户播放记录 */
            allData:[]
        };
    },
    props: ["muId"],
    methods: {
        //设置当前播放url
        setMusicUrl(mUrl, detail) {
            //设置关于音乐的链接和歌曲信息
            this.musicUrl = mUrl;
            this.music = detail;
            this.curId = detail.id;
            //将当前轮播图传来的歌曲id放入歌单中
            this.playListInfo.push(detail.id);

            this.setAudioTagsInfo();
        },
        //设置audio的各种信息
        setAudioTagsInfo() {
            let audio = this.$refs.playMusicAudio;
            //监听audio的timeUpdate事件
            audio.addEventListener("timeupdate", () => {
                //获取歌曲的总长度 example: 257s

                this.totalDuration = audio.duration;
                //获取歌曲时间
                this.musicDuration = audio.currentTime;

                //当前歌曲播放完毕自动播放下一首
                if (audio.currentTime >= audio.duration) {
                    this.changeNextMusic();
                }
            });
            //更新音乐播放状态
            this.isPlay = true;
        },
        //音量变化
        musicVolumeChange() {
            this.volumeChange(this.musicVolume / 100);
        },
        //改变音量的函数
        volumeChange(sum) {
            let audio = this.$refs.playMusicAudio;
            audio.volume = sum;
        },

        /* 播放和暂停 */
        playMusic() {
            var audio = this.$refs.playMusicAudio;
            audio.volume = this.musicVolume / 100;
            if (this.musicUrl !== "") {
                if (!audio.paused) {
                    audio.pause();
                } else {
                    audio.play();
                }
                this.isPlay = !this.isPlay;
            }
        },

        //音乐进度条值变化的方法
        musicTimeChange() {
            if (this.totalDuration === 0) return;
            let audio = this.$refs.playMusicAudio;
            audio.currentTime = this.musicDuration;
        },

        /* 音乐URL */
        getMusicUrl(muId) {
            const _this = this;
            axios
                .get("/song/url?id=" + muId)
                .then((resp) => {
                    console.log(resp);
                    console.log(resp.data.data[0].url);
                    _this.musicUrl = resp.data.data[0].url;
                })
                .catch((error) => {});
        },

        /* 音乐信息 */
        getMusic(muId) {
            const _this = this;
            axios
                .get("/song/detail?ids=" + muId)
                .then((resp) => {
                    console.log(resp.data);
                    console.log(resp.data.songs[0].al.picUrl);
                    _this.music = resp.data.songs[0];
                })
                .catch((error) => {});
        },

        /* 获取用户播放记录 */
        getRecord(){
            this.drawer = true
            console.log(window.localStorage.getItem("songList"));
            this.allData = window.localStorage.getItem("songList")
            /* const _this = this;
            this.getRequest('/user/record?uid=625203758').then(resp=>{
                _this.allData = resp.allData
                console.log(resp.allData);
            }) */

        },
        show(){
            this.$router.push("/friend")
        }
    },
    mounted() {
        this.setAudioTagsInfo();
        this.getMusic(1413863166);
        this.getMusicUrl(1413863166);
    },
    created() {
        this.totalDuration = 0;
        let audio = this.$refs.playMusicAudio;
        this.musicVolume = audio.volume
        this.getRecord()
    },
    filters: {
        timeFormat(time) {
            //分钟
            var minute = time / 60;
            var minutes = parseInt(minute);

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            //秒
            var second = time % 60;
            var seconds = Math.round(second);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return minutes + ":" + seconds;
        },
    },
    watch: {
        muId: function () {
            this.musicDuration = 0;
            this.setAudioTagsInfo();
            this.getMusic(this.muId);
            this.getMusicUrl(this.muId);
        },
    },
};
</script>

<style scoped>
.left,
.c,
.right {
    height: 73px;
}
.c {
    text-align: center;
}
.c img {
    border-radius: 50%;
    background-color: #f4f4f4;
    padding: 7px;
}
.c img:hover {
    background: #e5e5e5;
}

.c /deep/ .el-slider__button {
    border: 2px solid rgb(198, 47, 47) !important;
}

.c /deep/ .el-slider__button {
    width: 6px !important;
    height: 6px !important;
}
.c /deep/ .el-slider__button-wrapper {
    top: -15px;
}

.c /deep/ .el-slider__bar {
    background-color: rgb(198, 47, 47);
    height: 6px;
}
.c /deep/ .el-slider__runway {
    height: 5px;
}

.el-slider {
    width: 100%;
    margin: 0 auto;
}
.c .el-row .el-col span {
    font-size: 12px;
}
.c .myImg {
    padding: 0;
    list-style: none;
    position: absolute;
    top: 0;
    left: 42%;
}
.c .myImg li {
    float: left;
    margin-top: 5px;
    margin-right: 20px;
    margin-left: 20px;
}
.c .myImg .sx {
    margin-top: 10px;
}
.c .myImg .sx img {
    background: #fff;
}
.c .box {
    position: relative;
}
.musicImg {
    border-radius: 10px;
    margin: 5px;
    float: left;
}
.song {
    margin-top: 10px;
    float: left;
}
.music {
    width: 300px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.songer {
    margin-top: 10px;
    width: 300px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.right {
    display: flex;
    align-items: center;
}
.right .el-slider {
    margin: 0 10px;
}
.right /deep/ .el-slider__button {
    border: 2px solid rgb(198, 47, 47) !important;
}

.right /deep/ .el-slider__button {
    width: 6px !important;
    height: 6px !important;
}
.right /deep/ .el-slider__button-wrapper {
    top: -15px;
}

.right /deep/ .el-slider__bar {
    background-color: rgb(198, 47, 47);
    height: 6px;
}
.right /deep/ .el-slider__runway {
    height: 5px;
}
.el-dialog{
    margin: 60px 0;
}
 
.el-row /deep/ .el-drawer.rtl{
    top: 63px;
    height: 85%;
}
.img-box {
    display: none;
    width: 60px;
    height: 60px;
    background: #000;
    position: absolute;
    top: 5px;
    left: 5px;
    border-radius: 10px;
}
.left{
    position: relative;
}

</style>
