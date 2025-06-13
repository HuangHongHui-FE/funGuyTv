const Service = require("egg").Service;

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = "https://heimuer.tv/api.php/provide";
  }

  async list(params) {
    // 调用 CNode V1 版本 API
    const result = await this.ctx.curl(
      `${this.root}/vod/?ac=videolist&pg=0&pagesize=10&t=1`,
      {
        method: "get",
        data: params,
      }
    );
    // 检查调用是否成功，如果调用失败会抛出异常
    this.checkSuccess(result);
    // 返回创建的 topic 的 id
    return result.res;
  }

  async create(params) {
    // 调用 CNode V1 版本 API
    const result = await this.ctx.curl(`${this.root}/topics`, {
      method: 'post',
      data: params,
      dataType: 'json',
      contentType: 'json',
    });
    // 检查调用是否成功，如果调用失败会抛出异常
    this.checkSuccess(result);
    return result.data;
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg =
        result.data && result.data.error_msg
          ? result.data.error_msg
          : "unknown error";
      this.ctx.throw(result.status, errorMsg);
    }
    // if (!result.data.success) {
    //   // 远程调用返回格式错误
    //   this.ctx.throw(500, "remote response error", { data: result.data });
    // }
  }
}

module.exports = TopicService;
