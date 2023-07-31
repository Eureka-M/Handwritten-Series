function query(data) {
    const queryObj = {
        data: data,
        filters: [],
        sorters: [],
        groupByField: null,

        filter(callback) {
            this.filters.push(callback);
            // 返回 this，我们可以在一个方法调用后立即调用另一个方法，而不需要每次都创建一个新的实例
            return this;
        },

        sort(callback) {
            this.sorters.push(callback);
            return this;
        },

        groupBy(field) {
            this.groupByField = field;
            return this;
        },

        execute() {
            let result = this.data;

            for (const filter of this.filters) {
                result = result.filter(filter);
            }

            for (const sorter of this.sorters) {
                result = result.sort(sorter);
            }

            if (this.groupByField) {
                const groups = {};
                for (const item of result) {
                    const key = item[this.groupByField];
                    if (!groups[key]) {
                        groups[key] = [];
                    }
                    groups[key].push(item);
                }
                result = Object.values(groups);
            }

            return result;
        },
    };

    return queryObj;
}
