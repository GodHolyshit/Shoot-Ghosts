export class GameDate {
    static score = 0;
    static setScore = function () {
        this.score++;
    }
    static getScore = function () {
        return this.score;
    }
    static clearScore = function () {
        this.score = 0;
    }
}

(window as any).GameDate = GameDate;