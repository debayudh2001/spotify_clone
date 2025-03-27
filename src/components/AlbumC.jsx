const AlbumC = ({data}) => {
    //console.log(data?.id)
    return (
        <div className="flex flex-col p-3 gap-2 bg-[#121212] hover:bg-[#2A2A2A] hover:cursor-pointer rounded-xl w-64 justify-center">
            <img src={data?.images[2].url} alt="img" className="w-40 h-40 object-cover rounded-xl" />
            <span className="text-white font-bold line-clamp-2">{data?.name}</span>
            <span className="text-[gray] font-bold line-clamp-2">{data?.artists[0].name}</span>
        </div>
    )
}

export default AlbumC