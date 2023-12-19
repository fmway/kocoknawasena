export function randomKelompok(x=[], jumlahKelompok=0) {
    const listOrang = [...x];
    let jumlahOrang = listOrang.length;
    let hasil = [];
    let temp = 0;
    let index;
    for (let i = 0; i < jumlahKelompok; i++) {
        hasil.push([]);
    }
    while (listOrang.length) {
        for (let i = 0; i < hasil.length; i++) {
            if (++temp <= jumlahOrang) {
                index = Math.floor(Math.random() * listOrang.length);
                hasil[i].push(listOrang.at(index))
                listOrang.splice(index, 1);
            }
        }
    }
    return hasil;
}