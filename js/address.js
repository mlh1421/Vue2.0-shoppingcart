new Vue({
    el: ".address",
    data: {
        addressList: [],
        currentIndex: 0,
        shippingMethod: 1,
        itemFlag: 0,
        check: false,
        filter: 3
    },
    computed: {
        filterAddressList() {
            return this.addressList.slice(0, this.filter);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.init();
        })
    },
    methods: {
        init() {
            this.$http.get('data/address.json').then((response) => {
                this.addressList = response.data.result;
                console.log(this.addressList);
            })
        },
        showMore() {
            this.filter = (this.filter === 3) ? 5 : 3;
        },
        setDefault(addressId) {
            this.addressList.forEach((address, index) => {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            })
        },
        destroy(item) {
            if(item.isDefault){
                alert('默认地址无法删除！');
            } else {
                var index = this.addressList.indexOf(item);
                this.itemFlag = index;
                this.check = true;
            }
        },
        Delete() {
            this.addressList.splice(this.itemFlag, 1);
            this.check = false;
        },
        Close() {
            this.check = false;
        }
    }

})