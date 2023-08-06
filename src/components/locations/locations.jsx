function Locations(props) {

    return(
        <div className={`location-${props.id} locationCard`} >
            <p>{props.name}</p>
        </div>
    )
}

export default Locations