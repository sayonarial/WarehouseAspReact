import { map } from "jquery"
import { useEffect, useMemo, useState } from "react"
import { OverlayTrigger, Tooltip, Button, Row } from "react-bootstrap"
import Filter from "./SearchInput"
import ItemAddModal from "./ItemAddModal"
import SearchInput from "./SearchInput"
import { useFetching } from "../hooks/useFetching"
import ItemService from "../api/ItemService"
import { Spinner } from "reactstrap"

const ItemsTable = () => {

    const [itemsList, setItemsList] = useState([])

    const [search, setSearch] = useState('');

    const [pickedItem, setPickedItem] = useState([]);
    const [modalDetails, setModalDetails] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const [fetchItems, isItemsLoading, itemError] = useFetching(async () => {
        const items = await ItemService.getAllItems();
        setItemsList(items);
    })

    const removeItem = async (item) => {

        try {
            await ItemService.removeItem(item);
            setItemsList(itemsList.filter(p => p.id !== item.id))
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.response.data.title);
            console.log(error.response);
        }

    }

    const createItem = async (newItem) => {

        try {
            const savedItem = await ItemService.addItem(newItem);

            setItemsList([...itemsList, savedItem])
        } catch (error) {
            setIsError(true);
            setErrorMessage(error.response.data.title)
            console.log(error.response)
        }

    }

    const filteredItems = useMemo(() => {
        return itemsList.filter(item => item.title.toLowerCase().includes(search.toLocaleLowerCase()))

    }, [search, itemsList])

    useEffect(() => {
        fetchItems()
    }, [])

    useEffect(() => {
        setIsError(false)
    }, [search, modalCreate])

    return (
        <div>
            {isError ?
                <div class="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
                :
                <></>
            }
            <ItemAddModal
                active={modalCreate}
                setActive={setModalCreate}
                save={createItem}
            />

            <div class="row">

                <Button
                    className="col col-lg-2 mr-3"
                    onClick={() => setModalCreate(true)}
                >Add New
                </Button>

                <input
                    value={search}
                    onInput={(e) => setSearch(e.target.value)}
                    className="form-control col col-xs-1 mr-3"
                    type="search"
                    placeholder="Search"
                    aria-label="Search" />



            </div>


            {isItemsLoading ?

                <p>Loading...</p>
                :
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Serial</th>
                            <th scope="col">Place</th>
                            <th scope="col">Qtt.</th>
                            <th scope="col">Time added</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length === 0 ? <p> Items not found</p>
                            :
                            filteredItems.map(item =>
                                <Item item={item} remove={removeItem} />)
                        }
                    </tbody>
                </table>
            }
        </div>

    )
}

const Item = ({ item, remove, edit }) => {
    const DEF_IMG_SRC = 'img/default_box.jpg'

    return (
        <tr>
            <th scope="row" ><img height="40px" width='40px' src={DEF_IMG_SRC} alt="defImg" /></th>
            <td><p class="font-weight-bold">{item.title}</p></td>
            <td>{item.serialNumber}</td>
            <td>
                <OverlayTrigger
                    placement={'top'}
                    overlay={
                        <Tooltip>
                            {item.locationString}
                        </Tooltip>
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                </OverlayTrigger>
            </td>
            <td>{item.quantity}</td>
            <td><p class="font-italic">{item.timeUpdated}</p></td>
            <td>
                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    onClick={() => edit(item)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>

                </button>
                <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    onClick={() => remove(item)}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>

                </button>
            </td>
        </tr>
    )
}

export default ItemsTable