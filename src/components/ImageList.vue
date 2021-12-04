<template>
    <div class="img">
        <ul>
            <li v-for="item in playlists" :key="item.id" @click="geDanxq(item.id)">
                <div>
                    <div class="count"><img src="../assets/icon/播放_线条.png" alt="" width="14" height="14">{{item.playCount |palyFormat}}</div>
                    <img :src="item.coverImgUrl" alt="" width="200" height="200" />
                    <div class="flaotImg">
                        <img src="../assets/icon/播放1.png" alt="" width="30px" height="30px">
                    </div>
                    <p>{{ item.name }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "list",
    data() {
        return {
            playlists: [],
        };
    },
    props: {},
    methods: {
        getList(){
            const _this = this
            this.getRequest('/top/playlist/highquality').then(resp=>{
                console.log(resp);
                _this.playlists = resp.playlists
            })
        },
        geDanxq(id){
            console.log(">>>>>>>"+id);
            this.$router.push({path:'/gedan',query:{id:id}})
        }
    },
    mounted(){
        this.getList()
    },

    
};
</script>

<style scoped>
.img ul {
    list-style: none;
}
.img ul li {
    width: 200px;
    height: 250px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
}

.img ul li div img{
    border-radius: 8px;

}
.img ul li:hover .flaotImg{
    opacity: 1;
}
.img ul li div p {
    width: 200px;
    margin-top: 10px;
    font-size: 14px;

}
.flaotImg{
    opacity: 0;
    transition: all 1s;
    position: absolute;
    bottom: 60px;
    right: 15px;

}
.count{
    position: absolute;
    top: 5px;
    right: 10px;
    color: #fff;
    font-size: 14px;
}
.count img{
    margin-right: 5px;
}
</style>
