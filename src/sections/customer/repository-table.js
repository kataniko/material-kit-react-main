import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Avatar,
  Box,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
  Button,
  TextField,
  CardContent,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState, useEffect } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { LinearProgress } from "@mui/material"

export const CustomersTable = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editValues, setEditValues] = useState({
    // Initialize the edit form values here
    title: "",
    name: "",
    impact: "",
    bitbucket: "",
    tags: [],
    description: "",
    code: "",
  });


  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.titulo.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };


  useEffect(() => {
    axios.get('https://96831636-143e-46c8-8869-990ecc7937b0.mock.pstmn.io/repositorio')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // update filteredData with response data
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsDialogOpen(!!selectedItem);
  }, [selectedItem]);


  if (loading) {
    return <LinearProgress color="error" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditClick = (itemId) => {
    setEditItem(itemId);
    setEditValues({
      // Set the initial values of the edit form to the current item's values
      title: selectedItem.title,
      name: selectedItem.name,
      impact: selectedItem.impact,
      bitbucket: selectedItem.bitbucket,
      tags: selectedItem.tags,
      description: selectedItem.description,
      code: selectedItem.code,
    });
  };

  const handleEditClose = () => {
    setEditItem({
      id: "",
      titulo: "",
      name: "",
      impact: "",
      bitbucket: "",
      tags: [],
      created_at: "",
      description: "",
      code: ""
    });
  };

  const handleEditSubmit = (values) => {
    // Call an API function to update the data with the new values
    // ...
    const newData = data.map((item) => {
      if (item.id === editItem.id) {
        return { ...item, ...editItem };
      } else {
        return item;
      }
    });
    setData(newData);
  };


  return (

    <Card sx={{backgroundColor: 'rgba(255, 255, 255,0.2)', border:"1px solid white"}}>
      <Card sx={{ p: 2, display: "flex", justifyContent: "space-between", backgroundColor: 'rgba(255, 255, 255, 0)',  }}>
        <OutlinedInput 
          fullWidth
          placeholder="Search customer"
          startAdornment={(
            <InputAdornment position="start">
              <SvgIcon
                color="action"
                fontSize="small"
              >
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          )}
          sx={{ maxWidth: 500 }}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Button
          sx={{ color: "white", backgroundColor: "black", margin: "6px" }}
          variant="contained"
          onClick={() => {
            setData(data.filter((row) => !selectedRows.includes(row)));
            setFilteredData(filteredData.filter((row) => !selectedRows.includes(row)));
            setSelectedRows([]);
          }}
        >
          Delete
        </Button>

      </Card>

      <Scrollbar>

        <Box  sx={{ minWidth: 800 }}>

          <Table items={filteredData}>

            <TableHead>

              <TableRow>

                <TableCell padding="checkbox">


                </TableCell>

                <TableCell>
                  Title
                </TableCell>

                <TableCell>
                  Posted By:
                </TableCell>

                <TableCell>
                  Impact
                </TableCell>

                <TableCell>
                  Repository
                </TableCell>

                <TableCell>
                  Tags
                </TableCell>

                <TableCell sx={{color:"cyan"}}>
                  Date
                </TableCell>
                <TableCell>

                </TableCell>

              </TableRow>

            </TableHead>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
              <DialogContent sx={{border:"1px solid white"}}>

                {selectedItem && (

                  <Box>

                    <Typography sx={{color:"black", padding:2, borderRadius:2, textAlign:"center"}}  variant="h4">
                      
                      {selectedItem.titulo}
                    </Typography>

                    <Typography sx={{ margin: 1, display: "flex",border:"1px solid black",padding:1,borderRadius:1.5  }}>
                    <Typography sx={{ marginRight: 1, fontWeight: "bold",backgroundColor:"black",padding:1, borderRadius:1.5 }}>
                        Name:
                      </Typography>
                      {selectedItem.name}
                    </Typography>

                    <Typography sx={{ margin: 1, display: "flex",border:"1px solid black",padding:1,borderRadius:1.5  }}>
                      <Typography sx={{ marginRight: 1, fontWeight: "bold",backgroundColor:"black",padding:1, borderRadius:1.5 }}>
                        Impact:
                      </Typography>
                      {selectedItem.impact}
                    </Typography>

                    <Typography sx={{ margin: 1, display: "flex",border:"1px solid black",padding:1,borderRadius:1.5  }}>
                      <Typography sx={{ marginRight: 1, fontWeight: "bold",backgroundColor:"black",padding:1, borderRadius:1.5  }}>
                        Bitbucket:
                      </Typography>
                      {selectedItem.bitbucket}
                    </Typography>

                    <Typography sx={{ margin: 1, display: "flex", border:"1px solid black",padding:1,borderRadius:1.5 }}>
                      <Typography sx={{ marginRight: 1, fontWeight: "bold",backgroundColor:"black",padding:1, borderRadius:1.5  }}>
                        Tags:
                      </Typography>
                      {selectedItem.tags.map((tag) => tag.name).join(', ')}
                    </Typography>

                    <Typography sx={{ margin: 1, display: "flex",border:"1px solid black",padding:1,borderRadius:1.5 }}>
                      <Typography sx={{ marginRight: 1, fontWeight: "bold",backgroundColor:"black",padding:1, borderRadius:1.5  }}>
                        Created at:
                      </Typography>

                      {selectedItem.created_at}
                    </Typography>

                    <Typography sx={{ margin: 1, display: "flex" }}>
                      <Typography sx={{ marginRight: 1, fontWeight: "bold" }}>
                        Description:
                      </Typography>
                      {selectedItem.description}
                    </Typography>

                    <Typography sx={{ margin: 1, display: "flex" }}>
                      <Typography sx={{ marginRight: 1, fontWeight: "bold" }}>
                        Code:
                      </Typography>
                      {selectedItem.description}
                    </Typography>

                    <form onSubmit={handleEditSubmit}>
                      
                      <TextField
                        label="Title"
                        value={filteredData.title}
                        onChange={(e) =>
                          setEditItem({ ...editItem, titulo: e.target.value })
                        }
                      />

                      <TextField
                        label="Name"
                        value={filteredData.name}
                        onChange={(e) =>
                          setEditItem({ ...editItem, name: e.target.value })
                        }
                      />
                      {/* Add other fields to the form here */}
                      <Button type="submit">Save Changes</Button>
                      <Button onClick={handleEditClose}>Cancel</Button>
                    </form>

                  </Box>

                )}

              </DialogContent>

            </Dialog>

            <TableBody>
              {filteredData.map((item) => {

                return (
                  <TableRow
                    hover
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsDialogOpen(true);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(item)}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setSelectedRows([...selectedRows, item]);
                          } else {
                            setSelectedRows(selectedRows.filter((row) => row !== item));
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>

                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >

                        <Typography sx={{color:"white"}} variant="subtitle2">
                          {item.titulo}
                        </Typography>

                      </Stack>

                    </TableCell>

                    <TableCell sx={{color:"white", textShadow:"1px 1px 1px black"}}>
                      {item.name}
                    </TableCell>

                    <TableCell sx={{color:"white"}}>
                      {item.impact}
                    </TableCell>

                    <TableCell sx={{color:"white"}}>
                      {item.bitbucket}
                    </TableCell>

                    <TableCell sx={{color:"white"}}>
                      {item.tags.map((tag) => tag.name).join(', ')}
                    </TableCell>

                    <TableCell sx={{color:"white"}}>
                      {item.created_at}
                    </TableCell>

                  </TableRow>
                );
              })}

            </TableBody>

          </Table>

        </Box>

      </Scrollbar>


    </Card>
  );
};

CustomersTable.propTypes = {

  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  )

};
