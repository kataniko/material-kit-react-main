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
import { LinearProgress } from "@mui/material";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

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

    <Card sx={{ backgroundColor: 'rgba(255, 255, 255,0.1)', border: "1px solid white", borderRadius: 2 }}>
      <Card sx={{ p: 2, display: "flex", justifyContent: "space-between", backgroundColor: 'rgba(255, 255, 255, 0)' }}>
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
          sx={{ maxWidth: 500, color: "white" }}
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

        <Box sx={{ minWidth: 800 }}>

          <Table items={filteredData}>

            <TableHead>

              <TableRow>

                <TableCell padding="checkbox">


                </TableCell>

                <TableCell>
                  <Typography sx={{ textAlign: "left" }}>
                    Title
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ textAlign: "center" }}>
                    Posted By
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ textAlign: "center" }}>
                    Impact
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ textAlign: "center" }}>
                    Repository
                  </Typography>
                </TableCell>

                <TableCell >
                  <Typography sx={{ textAlign: "center" }}>
                    Tags
                  </Typography>
                </TableCell>

                <TableCell sx={{ color: "cyan" }}>
                  <Typography sx={{ textAlign: "center", fontWeight: 500 }}>
                    Date
                  </Typography>
                </TableCell>
                <TableCell>

                </TableCell>

              </TableRow>

            </TableHead>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
              <DialogContent sx={{ backgroundColor: "rgba(255,255,255,0)" }}>


                {selectedItem && (

                  <Box sx={{ backgroundColor: "transparent" }} >
                    <Card elevation={10} sx={{ boxShadow: "2px 2px 10px black", height: 500 }}>
                      <CardContent>

                        <Typography sx={{ color: "black", padding: 2, borderRadius: 2, textAlign: "center" }} variant="h4">
                          {selectedItem.titulo}
                        </Typography>

                        <Typography sx={{ margin: 1, display: "flex", border: "1px solid black", padding: 1, borderRadius: 1.5, alignItems: "center" }}>
                          <Typography sx={{ marginRight: 1, fontWeight: "bold", backgroundColor: "black", padding: 1, borderRadius: 1.5 }}>
                            Name:
                          </Typography>
                          <Typography sx={{ color: "black", fontSize: 18 }}>
                            {selectedItem.name}
                          </Typography>
                        </Typography>

                        <Typography sx={{ margin: 1, display: "flex", border: "1px solid black", padding: 1, borderRadius: 1.5 }}>
                          <Typography sx={{ marginRight: 1, fontWeight: "bold", backgroundColor: "black", padding: 1, borderRadius: 1.5 }}>
                            Impact:
                          </Typography>
                          <Typography sx={{ color: "black", fontSize: 18 }}>
                            {selectedItem.impact}
                          </Typography>
                        </Typography>

                        <Typography sx={{ margin: 1, display: "flex", border: "1px solid black", padding: 1, borderRadius: 1.5, alignItems: "center" }}>
                          <Typography sx={{ marginRight: 1, fontWeight: "bold", backgroundColor: "black", padding: 1, borderRadius: 1.5 }}>
                            Bitbucket:
                          </Typography>
                          <Typography sx={{ color: "black", fontSize: 18 }}>
                            {selectedItem.bitbucket}
                          </Typography>
                        </Typography>

                        <Typography sx={{ margin: 1, display: "flex", border: "1px solid black", padding: 1, borderRadius: 1.5, alignItems: "center" }}>
                          <Typography sx={{ marginRight: 1, fontWeight: "bold", backgroundColor: "black", padding: 1, borderRadius: 1.5 }}>
                            Tags:
                          </Typography>
                          <Typography sx={{ color: "black", fontSize: 18 }}>
                            {selectedItem.tags.map((tag) => tag.name).join(', ')}
                          </Typography>
                        </Typography>

                        <Typography sx={{ margin: 1, display: "flex", border: "1px solid black", padding: 1, borderRadius: 1.5, alignItems: "center" }}>
                          <Typography sx={{ marginRight: 1, fontWeight: "bold", backgroundColor: "black", padding: 1, borderRadius: 1.5 }}>
                            Created at:
                          </Typography>
                          <Typography sx={{ color: "black", fontSize: 18 }}>
                            {selectedItem.created_at}
                          </Typography>
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

                      </CardContent>
                    </Card>


                    <form onSubmit={handleEditSubmit}>
                      <Card elevation={10} sx={{ boxShadow: "2px 2px 20px black", mt: 2 }}>
                        <CardContent>

                          <Typography sx={{ color: "black", fontWeight: "Bold", marginBottom: 2, fontSize: 20 }} >Update Content</Typography>

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
                          <Button type="submit" sx={{ color: "black" }}>Save Changes</Button>
                          <Button sx={{ color: "black" }} onClick={handleEditClose}>Cancel</Button>
                        </CardContent>
                      </Card>
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

                        <Typography sx={{ color: "white", fontSize: 15, textShadow: "0px 0px 0px black", border: "1px solid black", padding: 1, borderRadius: 10, backgroundColor: "black", textAlign: "center", fontWeight: 300 }} variant="subtitle2">
                          {item.titulo}
                        </Typography>

                      </Stack>

                    </TableCell>

                    <TableCell  >
                      <Typography sx={{ color: "white", fontSize: 15, textShadow: "0px 0px 0px black", border: "1px solid black", padding: 1, borderRadius: 10, backgroundColor: "black", textAlign: "center", fontWeight: 300 }} variant="subtitle2">
                        {item.name}
                      </Typography>
                    </TableCell>

                    <TableCell >
                      <Typography sx={{ color: "white", fontSize: 15, textShadow: "0px 0px 0px black", border: "1px solid black", padding: 1, borderRadius: 10, backgroundColor: "black", textAlign: "center", fontWeight: 300 }} variant="subtitle2">
                        {item.impact}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                      <Typography sx={{ color: "white", fontSize: 15, textShadow: "0px 0px 0px black", border: "1px solid black", padding: 1, borderRadius: 10, backgroundColor: "black", textAlign: "center", fontWeight: 300 }} variant="subtitle2">
                        {item.bitbucket}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                      <Typography sx={{ color: "white", fontSize: 15, textShadow: "0px 0px 0px black", border: "1px solid black", padding: 1, borderRadius: 10, backgroundColor: "black", textAlign: "center", fontWeight: 300 }} variant="subtitle2">
                        {item.tags.map((tag) => tag.name).join(', ')}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                      <Typography sx={{ color: "white", fontSize: 15, textShadow: "0px 0px 0px black", border: "1px solid black", padding: 1, borderRadius: 10, backgroundColor: "black", textAlign: "center", fontWeight: 300 }} variant="subtitle2">
                        {item.created_at}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                      <Button onClick={() => {
                        setSelectedItem(item);
                        setIsDialogOpen(true);
                      }} variant='outlined' sx={{ color: "black", borderColor: "black", fontWeight: "bold" }}><EditTwoToneIcon/></Button>
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
