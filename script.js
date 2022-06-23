const judul = document.querySelector('#judul');
const penulis = document.querySelector('#penulis');
const tahun = document.querySelector('#tahun');
const checkboks = document.querySelector('#checboks');
const submit = document.querySelector('#submit');
const alerts = document.querySelector('#alert');
const isiAlert = document.querySelector('#isiAlert');
const keyword = document.getElementById('keyword');
const cari = document.getElementById('cari');
const belumBaca = document.querySelector('.belumBaca');
const selesaiBaca = document.querySelector('.selesaiBaca');

let fullData = [];

function listKondisi(index, fullData) {
    if (fullData[index].baca == false) {
        belumBaca.innerHTML = belumBaca.innerHTML + `<div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${fullData[index].judul}</h6>
                    <p class="card-text">${fullData[index].penulis} (${fullData[index].tahun})</p>
                    <button value="${index}" class="btn btn-success" id="sudah" >Sudah Baca</button>
                    <button value="${index}" class="btn btn-danger" id="hapus" >Hapus</button>
                </div>
            </div>
        </div>`;
    } else {
        selesaiBaca.innerHTML = selesaiBaca.innerHTML + `<div class="col-sm-12">
        <div class="card">
            <div class="card-body">
                <h6 class="card-title">${fullData[index].judul}</h6>
                <p class="card-text">${fullData[index].penulis} (${fullData[index].tahun})</p>
                <button value="${index}" class="btn btn-warning" id="belum" >Belum Membaca</button>
                <button value="${index}" class="btn btn-danger" id="hapus" >Hapus</button>
            </div>
        </div>
    </div>`;
    }
}

function listBelumBaca(fullData) {
    belumBaca.innerHTML = '';
    selesaiBaca.innerHTML = '';
    for (const index in fullData) {
        listKondisi(index, fullData)
    }
}

submit.addEventListener('click', function () {
    if (judul.value != "" && penulis.value != "" && tahun.value != "") {
        let data = {
            judul: judul.value,
            penulis: penulis.value,
            tahun: tahun.value,
            baca: checkboks.checked,
        };
        fullData.push(data);
        listBelumBaca(fullData);
        judul.value = "";
        penulis.value = "";
        tahun.value = "";
        checkboks.checked = false;
        alerts.removeChild(alerts.firstChild);
    }else{
        alerts.innerHTML = `<div class="alert alert-danger" role="alert" id="isiAlert"><a class="alert-link">form tidak boleh kosong !!!</a>
    </div>`
    }
});

belumBaca.addEventListener('click', function (e) {
    if (e.target.id == "sudah") {
        fullData[e.target.value].baca = true;
        listBelumBaca(fullData);
    }
    hapus(e);
});

selesaiBaca.addEventListener('click', function (e) {
    if (e.target.id == "belum") {
        fullData[e.target.value].baca = false;
        listBelumBaca(fullData);
    }
    hapus(e);
});

function hapus(e) {
    if (e.target.id == 'hapus') {
        const masuk = confirm("Anda Yakin Ingin Menghapus nya ?");
        if (masuk) {
            keyword.value = "";
            delete fullData[e.target.value];
            listBelumBaca(fullData);
        }
    }
}

cari.addEventListener('click', function (e) {
    if (e.target.id == "btnCari") {
        const keywordValue = keyword.value.toLowerCase();
        const dataFilter = fullData.slice(0);
        belumBaca.innerHTML = "";
        selesaiBaca.innerHTML = "";
        for (const index in dataFilter) {
            if (dataFilter[index].judul.includes(keywordValue)) {
                listKondisi(index, dataFilter);
            }
        }
    }
    
    if (e.target.id == "reset") {
        keyword.value = "";
        listBelumBaca(fullData);
    }
})

const mode = document.getElementById('mode');
const labelCheck = document.querySelector('#labelCheck'); 



mode.addEventListener('click', function () {
    const body = document.body;
    const head = document.querySelector('.head');
    const bgDark = document.querySelectorAll('.card');

        bgDark[0].classList.toggle('bg-dark');          
        bgDark[0].classList.toggle('border-white');
        bgDark[0].classList.toggle('text-light');

        body.classList.toggle('bg-secondary');
        head.classList.toggle('text-light');

        if (mode.checked == true) {
            labelCheck.innerHTML = "Light Mode";
        } else {
            labelCheck.innerHTML = "Dark Mode";
        }
})