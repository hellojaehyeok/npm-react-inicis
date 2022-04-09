// 타임스탭프 제작
function MakeTimeStamp(){
    let newTimestamp = null;
    newTimestamp = + new Date();
    return newTimestamp;
}

export default MakeTimeStamp;