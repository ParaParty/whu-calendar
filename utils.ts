interface Date {
    convertToICSDate(): [number, number, number];
    addDay(day : number): Date;
    addWeek(week : number): Date;
}

Date.prototype.convertToICSDate = function(): [number, number, number] {
    let year = this.getFullYear();
    let month = this.getMonth() + 1;
    let date = this.getDate();
    return [year, month, date];
}

Date.prototype.addDay = function(i : number) : Date {
    return new Date(this.getTime() + i * 86400 * 1000);
}

Date.prototype.addWeek = function(i : number) : Date {
    return this.addDay(i * 7)
}