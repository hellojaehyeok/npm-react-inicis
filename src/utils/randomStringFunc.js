// 랜덤 문자열 (oid 생성시 필요)
function RandomStringFunc (index) {
    // 대문자 영문 
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
    // 반환받을 문자열의 수
    let randomstring = ''
    for (let i = 0; i < index; i++) {
        const rnum = Math.floor(Math.random() * chars.length)
        randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
}

export default RandomStringFunc;