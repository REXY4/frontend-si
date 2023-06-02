import { SelectInputNative } from "../inputs";

interface PropsList {
    label : string,
    value : string|any,
    setValue :any,
    selectInput :boolean,
    selectData : any
}

const ListOrder = ({
 label, value, setValue, selectInput, selectData
}:PropsList) => {
    return(
      <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "255px",
                marginBottom: "10px"
              }}
      >
        <p style={{ fontWeight: "bold", fontSize: "12px" }}>
          {label}
          {' '}
          :
        </p>
        {selectInput
        ? <SelectInputNative value={value} setValue={setValue} data={selectData} detail={false} />
        : <p>{value}</p>}
      </div>
    );
};

export default ListOrder;
