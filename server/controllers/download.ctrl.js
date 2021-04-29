const pathDir = __dirname + '../../../uploads/';
const download = async (req, res) => {
    const filename = `${pathDir}/${req.params.filename}`
    res.download(filename);
}

export default {
    download
}