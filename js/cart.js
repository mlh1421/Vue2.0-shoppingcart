new Vue({
    el: "#app",
    data: {
        msg: "javascript",
        // totalMoney: 0,
        checkAllFlag: false,
        mdShow: false,
        itemFlag: {},
        productList: []
    },
    filters: {                                                       //过滤器
        formatMoney(value) {
            return "￥" + value.toFixed(2);

        },
        money(value, type) {
            return "￥" + value.toFixed(2) + type;
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.init();
        })
    },
    computed: {
        totalMoney() {
            var total = 0;
            this.productList.forEach((item) => {
                if (item.check) {
                    total += item.price * item.count;
                }
            })
            return total;
        }
    },
    methods: {
        init: function () {
            this.$http.get('data/cart.json').then((response) => {
                if (response.data.status == 0) {
                    this.productList = response.data.result.list;
                    this.totalMoney = response.data.result.totalHoney;
                }
            })
        },
        mdClose() {
            this.mdShow = false;
        },
        delet(item) {
            this.mdShow = true;
            this.itemFlag = item;
        },
        Delete() {
            console.log(this.itemFlag);
            var index = this.productList.indexOf(this.itemFlag);
            console.log(index);
            this.productList.splice(index, 1);
            this.mdShow = false;
        },
        add(item) {
            item.count++;
        },
        decrease(item) {
            if (item.count > 1) {
                item.count--;
            }
        },
        toggleCheck(item) {
            // console.log(item.check);
            if (item.check == undefined) {
                this.$set(item, 'check', true);
            } else {
                item.check = !item.check;
            }
        },
        checkAll() {
            this.checkAllFlag = !this.checkAllFlag;
            this.productList.forEach((item) => {
                if (item.check == undefined) {
                    this.$set(item, 'check', true);
                } else {
                    item.check =!item.check;
                }
            })
        }
    }
})