import { GameDate } from "../GameDate";

/**
 * copyright (c) 2017-2019 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 文件功能描述
 * 作者
 * YYYY-MM-DD
 */





const { ccclass, property } = cc._decorator;

@ccclass
export class enemy extends cc.Component {

    // =======================================
    // 编辑器属性定义(以@property修饰)
    // =======================================

    @property(cc.Integer)
    HP : number = 4 ;

    @property(cc.Node)
    Bar: cc.Node  = null;

    @property(cc.Node)
    HPBar: cc.Node  = null;
    // =======================================
    // 静态属性定义(以static修饰)
    // =======================================

    /** 游戏事件对象 */
    // public static EEventName = {
    //     // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
    // };




    // =======================================
    // 外部/内部属性定义(以public/private修饰)
    // =======================================
    // 数据对象缓存
    // private data = null;
    // private datas = [];

    moveSpeed = 100;


    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================

    onLoad(){
        cc.director.getCollisionManager().enabled = true;
    }
    // onEnabled() {

    // }

    // onDesabled() {

    // }

    /** 注册事件 */
    onAddEvents() {

    }

    /** 取消事件注册 */
    onRemoveEvents() {

    }

    /** 初始化配置 */
    // onLoadConfig() {

    // }

    /** onLoad结束的回调 */
    // onLoaded() {

    // }

    /** 在组件第一次update前调用，做一些初始化逻辑 */
    onStart() {

    }

    /**
     * 场景动画更新前回调
     * @param dt 游戏帧时长
     */
    // onUpdate(dt: number) {

    // }

    /** 场景动画更新后回调 */
    // onLateUpdate(dt: number) {

    // }

    update(dt) {
        this.node.y -= dt * this.moveSpeed;
        if(this.node.y <= -cc.winSize.height){
            this.node.destroy();
        }
    }

    /** 销毁组件 */
    onDestroyed() {

    }




    // =======================================
    // 引擎事件回调(以on开头)
    // =======================================
    /** touch事件回调 */
    // onTouchStart(event: cc.Event.EventTouch) {

    // }
    // onTouchMoved(event: cc.Event.EventTouch) {

    // }
    // onTouchEnded(event: cc.Event.EventTouch) {

    // }
    // onTouchCancelled(event: cc.Event.EventTouch) {

    // }

    onCollisionEnter(other,self){
        if(other.node.group == "bullet"){
            this.Bar.active = true;
            this.node.getComponent(cc.ProgressBar).progress -= 0.25;
            this.HP--;
            if(this.HP  <= 0 ){
                GameDate.setScore();
                self.node.destroy();
            }
        }
    }


    // =======================================
    // 自定义事件回调(以on开头)
    // =======================================

    /** 按钮点击事件 */
    // onClicked(event: cc.Event, customData: string) {

    // }




    // =======================================
    // 服务端接口调用(以submitXXXToServer、getXXXXFromServer命名)
    // =======================================

    // 从服务端获取数据
    // private getDataFromServer() {

    // }




    // =======================================
    // 游戏逻辑方法(内部调用的用private修饰，外部调用和编辑器绑定的public修饰，废弃的方法不加修饰符方便后期移除)
    // =======================================

    // setData(data) {
    //     this.data = data;
    //     // init TODO:
    // }


}
