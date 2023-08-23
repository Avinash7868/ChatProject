import { gql, useSubscription } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
const CREATE_SUBSCRIPTION = gql`
  subscription studentCreated {
    studentCreated {
      name
      enrollmentNo
      mobileNo
      bloodGroup
      address
    }
  }
`;

const DELETE_SUBSCRIPTION = gql`
  subscription studentDeleted {
    studentDeleted {
      name
      enrollmentNo
      mobileNo
    }
  }
`;

const Subscription = () => {
  const { data, loading } = useSubscription(CREATE_SUBSCRIPTION);
  const { data: deleteData, loading: deleteLoading } =
    useSubscription(DELETE_SUBSCRIPTION);
  const [deleteSubscriptionData, setDeleteSubscriptionData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);

  // Whenever new data is received, I am updating  the state with the latest data in subscription
  // In below code it will automatically re-render the component with the updated data
  useEffect(() => {
    if (data && data.studentCreated) {
      setSubscriptionData((prevData) => [...prevData, data.studentCreated]);
    }
  }, [data]);

  useEffect(() => {
    if (deleteData && deleteData.studentDeleted) {
      setDeleteSubscriptionData((prevData) => [
        ...prevData,
        deleteData.studentDeleted,
      ]);
    }
  }, [deleteData]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Subscription</h1>
      {subscriptionData.map((student, index) => (
        <div key={index}>
          <h3>Student {student.name} is Created By user</h3>
          <p>Name: {student.name}</p>
          <p>Enrollment No: {student.enrollmentNo}</p>
          <p>Mobile No: {student.mobileNo}</p>
          <p>Blood Group: {student.bloodGroup}</p>
          <p>Address: {student.address}</p>
        </div>
      ))}
      {deleteSubscriptionData.map((student, index) => (
        <div key={index}>
          <h3>Student {student.name} is Deleted By user</h3>
          <p>Name: {student.name}</p>
          <p>Enrollment No: {student.enrollmentNo}</p>
          <p>Mobile No: {student.mobileNo}</p>
        </div>
      ))}
    </div>
  );
};

export default Subscription;

// const Subscription = () => {
//   const { data, loading } = useSubscription(CREATE_SUBSCRIPTION);
//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Subscription</h1>
//       <p>{JSON.stringify(data)}</p>
//     </div>
//   );
// };
