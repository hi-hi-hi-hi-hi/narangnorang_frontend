<template>
    <!-- 상대가 보냄 -->
    <div v-if="from === '노랑이'" class="message-feed media">
        <div class="pull-left">
            <img src="@/assets/common/norang.png" alt="" class="img-avatar">
        </div>
        <div class="media-body">
            <div class="mf-content">
                {{ content }}
            </div>
        </div>
    </div>
    <!-- 내가 보냄 -->
    <div v-else class="message-feed right">
        <div class="media-body">
            <div class="mf-content">
                {{ content }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        from: String,
        content: String
    }
}
</script>

<style scoped>

body {
    font-family: Roboto,sans-serif;
    font-size: 13px;
    line-height: 1.42857143;
    color: #767676;
    background-color: #edecec;
}

#messages-main {
    position: relative;
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

#messages-main:after, #messages-main:before {
    content: " ";
    display: table;
}

@media (min-width:768px) {
    #messages-main .ms-body {
    padding-left: 240px;
}

}@media (max-width:767px) {
    #messages-main .ms-menu {
    height: calc(100% - 58px);
    display: none;
    z-index: 1;
    top: 58px;
}

#messages-main .ms-body {
    overflow: hidden;
}
}

#messages-main #ms-compose {
    position: fixed;
    bottom: 120px;
    z-index: 1;
    right: 30px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
}

#ms-menu-trigger {
    user-select: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
    padding-right: 10px;
    padding-top: 19px;
}

#ms-menu-trigger i {
    font-size: 21px;
}

.message-feed {
    padding: 20px;
}

.message-feed.right>.pull-right {
    margin-left: 15px;
}

.message-feed:not(.right) .mf-content {
    background: #03a9f4;
    color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.message-feed.right .mf-content {
    background: #eee;
}

.mf-content {
    padding: 12px 17px 13px;
    border-radius: 2px;
    display: inline-block;
    max-width: 80%
}

.mf-date {
    display: block;
    color: #B3B3B3;
    margin-top: 7px;
}

.mf-date>i {
    font-size: 14px;
    line-height: 100%;
    position: relative;
    top: 1px;
}

.msb-reply {
    box-shadow: 0 -20px 20px -5px #fff;
    position: relative;
    margin-top: 30px;
    border-top: 1px solid #eee;
    background: #f8f8f8;
}

.msb-reply textarea {
    width: 90%;
    font-size: 13px;
    border: 0;
    padding: 10px 15px;
    resize: none;
    height: 60px;
    background: 0 0;
}

.msb-reply button {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    height: 100%;
    width: 60px;
    font-size: 25px;
    color: #2196f3;
    background: 0 0;
}

.msb-reply button:hover {
    background: #f2f2f2;
}

.img-avatar {
    height: 37px;
    border-radius: 2px;
    width: 37px;
}

.action-header {
    position: relative;
    background: #f8f8f8;
    padding: 15px 13px 15px 17px;
}

.ms-body{
    background:#fff;
}

#ms-menu-trigger {
    user-select: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
    padding-right: 10px;
    padding-top: 19px;
    cursor:pointer;
}

#ms-menu-trigger, .message-feed.right {
    text-align: right;
}

.history {
	height: 500px;
	overflow:auto;
}

.send-button {
    color: black;
    font-size: 10px;
}

</style>
