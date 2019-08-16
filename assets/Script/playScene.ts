import { GameDate } from "./GameDate";
import { enemy } from "./PrefabTs/enemy";

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
export class playScene extends cc.Component {

    // =======================================
    // 编辑器属性定义(以@property修饰)
    // =======================================

    @property(cc.Node)
    playerNode: cc.Node = null;

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    enemyPrefab:cc.Prefab = null;

    @property(cc.Node)
    iniBulletNode: cc.Node = null;

    @property([cc.Node])
    bgArr: Array<cc.Node> = [];

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property([cc.Node])
    enemyArr: Array<cc.Node> = [];
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

    private moveSpeed = 0.5;

    time = 60;
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveFun, this);
        this.schedule(function () {
            this.createEnemy();
            this.createEnemy();
        }, 0.8);
        this.schedule(function () {
            this.emmitBullet();
        }, 0.1);
        this.schedule(function(){
            this.time--;
            if(this.time <= 0){
                cc.director.loadScene("accountsScene");
            }
        },1)
        this.scoreLabel.string = "消灭:" + GameDate.getScore();
        this.timeLabel.string = "坚持:" + this.time +"/60";

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
        this.bgMove(this.bgArr, this.moveSpeed);
        this.scoreLabel.string = "消灭:" + GameDate.getScore();
        this.timeLabel.string = "坚持:" + this.time +"/60";
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

    bgMove(bgArr, moveSpeed) {
        for (let i = 0; i < bgArr.length; i++) {
            bgArr[i].y -= moveSpeed;
        }
        if (bgArr[0].y <= 0 - bgArr[0].height) {
            bgArr[0].y = 1334;
        }
        if (bgArr[1].y <= 1334 - 2 * bgArr[1].height) {
            bgArr[1].y = 1334;
        }
    }

    touchMoveFun(event) {

        let pos = event.getLocation();
        let p = this.node.convertToNodeSpaceAR(pos);
        this.playerNode.x = p.x;

    }

    emmitBullet() {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node;
        let firePos = this.iniBulletNode.parent.convertToWorldSpaceAR(this.iniBulletNode.getPosition());
        let fireP = this.node.convertToNodeSpaceAR(firePos);
        bullet.x = fireP.x;
        bullet.y = fireP.y;
    }

    createEnemy(){
        let enemyNode = cc.instantiate(this.enemyPrefab);
        let num = Math.floor(Math.random()*6);
        console.log("num:",num);
        if(num == 0){
            enemyNode.parent = this.enemyArr[0];
        }
        else if(num == 1){
            enemyNode.parent = this.enemyArr[1];
        }
        else if(num == 2){
            enemyNode.parent = this.enemyArr[2];
        }
        else if(num == 3){
            enemyNode.parent = this.enemyArr[3];
        }
        else if(num == 4){
            enemyNode.parent = this.enemyArr[4];
        }
        else if(num == 5){
            enemyNode.parent = this.enemyArr[5];
        }
    }
}
