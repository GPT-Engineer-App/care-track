import React, { useState } from "react";
import { Box, Heading, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddPatient = (patient) => {
    setPatients([...patients, patient]);
    onClose();
  };

  const handleEditPatient = (updatedPatient) => {
    const updatedPatients = patients.map((patient) => (patient.id === updatedPatient.id ? updatedPatient : patient));
    setPatients(updatedPatients);
    onClose();
  };

  const handleDeletePatient = (patientId) => {
    const updatedPatients = patients.filter((patient) => patient.id !== patientId);
    setPatients(updatedPatients);
  };

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Patient Management System
      </Heading>
      <Box mb={4}>
        <Input placeholder="Search patients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </Box>
      <Box mb={4}>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="blue"
          onClick={() => {
            setSelectedPatient(null);
            onOpen();
          }}
        >
          Add Patient
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>Gender</Th>
            <Th>Address</Th>
            <Th>Phone</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredPatients.map((patient) => (
            <Tr key={patient.id}>
              <Td>{patient.name}</Td>
              <Td>{patient.age}</Td>
              <Td>{patient.gender}</Td>
              <Td>{patient.address}</Td>
              <Td>{patient.phone}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  aria-label="Edit"
                  mr={2}
                  onClick={() => {
                    setSelectedPatient(patient);
                    onOpen();
                  }}
                />
                <IconButton icon={<FaTrash />} aria-label="Delete" onClick={() => handleDeletePatient(patient.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPatient ? "Edit Patient" : "Add Patient"}</ModalHeader>
          <ModalBody>
            <PatientForm patient={selectedPatient} onSubmit={selectedPatient ? handleEditPatient : handleAddPatient} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const PatientForm = ({ patient, onSubmit }) => {
  const [name, setName] = useState(patient?.name || "");
  const [age, setAge] = useState(patient?.age || "");
  const [gender, setGender] = useState(patient?.gender || "");
  const [address, setAddress] = useState(patient?.address || "");
  const [phone, setPhone] = useState(patient?.phone || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: patient?.id || Date.now(),
      name,
      age,
      gender,
      address,
      phone,
    });
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Age</FormLabel>
        <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Gender</FormLabel>
        <Input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Address</FormLabel>
        <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Phone</FormLabel>
        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        {patient ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default Index;
