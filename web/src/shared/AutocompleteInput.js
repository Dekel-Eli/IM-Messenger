import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import './SharedStyles.css';


export default function AutoCompleteInput(props) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setValue] = useState("");
    const [IsValueSelected, setIsValueSelected] = useState(false);

    const data = props.data?.filter((item) =>
        item[props.filterBy]).map(p =>
            Object.assign(p, { filterByLowered: p[props.filterBy].toLowerCase() }))

    const filteredValues = (keyword) => {
        return new Promise((res) => {
            const searchResults = data.filter((item) =>
                item.filterByLowered.includes(keyword.toLowerCase()));
            res(searchResults);
        });
    };
    const handleInputChange = (e) => {
        const nameValue = e.target.value;
        setValue(nameValue);
        // even if we've selected already an item from the list, we should reset it since it's been changed
        setIsValueSelected(false);
        // clean previous results, as would be the case if we get the results from a server
        setResults([]);
        if (nameValue.length > 1) {
            setIsLoading(true);
            filteredValues(nameValue)
                .then((res) => {
                    setResults(res);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }
    };

    const onValueSelected = (selectedValue) => {
        setValue(selectedValue);
        setResults([]);
        setIsValueSelected(true);
    };
    const handleClick = (e) => {
        let value = name;
        setValue('')
        props.setActionOnButton(data.filter((item) => item[props.filterBy] === value)[0]);
    }

    return (
        <Form.Group className="m-1 form-group">
            <div className="d-flex " >
                <button className="btn clickable" id="start-chat"
                    disabled={!IsValueSelected}
                    onClick={handleClick}>
                    💬
                    <i className="bi bi-send-plus"></i>
                </button>
                <input
                    className="form-control rounded w-100 clickable"
                    type="text"
                    autoComplete="off"
                    placeholder={props.placeholder}
                    onChange={handleInputChange}
                    value={name} />
            </div>
            {(!results.length || isLoading) ?
                (<div className="spinner-border text-info" role="status" />) :
                <ListGroup className="list-group list-group-item menu dropdown-menu">
                    {!IsValueSelected &&
                        results.length > 0 &&
                        results.map((result) => (
                            <ListGroup.Item key={result.id}
                                className="list-inline item dropdown-item clickable"
                                onClick={() => onValueSelected(result[props.filterBy])}>
                                {result[props.filterBy]}
                            </ListGroup.Item>
                        ))}

                </ListGroup>
            }
        </Form.Group>
    );
}
