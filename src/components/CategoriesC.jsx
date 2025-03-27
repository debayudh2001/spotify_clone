const CategoriesC = ({data}) => {
    return (
        <>
          <div className="w-[250px] h-[140px] relative">
            <img src={data.icons[0].url} alt='img' className="w-full h-full rounded-lg object-cover" />
            <span className="text-white text-xl font-bold absolute bottom-2 left-3">{data.name}</span>
          </div>
        </>
    )
}

export default CategoriesC