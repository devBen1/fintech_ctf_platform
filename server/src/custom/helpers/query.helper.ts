export class QueryHelper {

    // CREATE, READ, DESTROY
    async credQuery(model: any, queryType: any, data: any) {
        const credQuery = await model[queryType](data);
        return credQuery;
    }

    // // UPDATE
    async updateQuery(model: any, queryType: any, data: any, whereClause: any) {
        const updateQuery = await model[queryType](
            data,
            whereClause
        );
        return updateQuery;
    }

}