import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../services/orderService";
import { 
  fetchOrdersStart, 
  fetchOrdersSuccess, 
  fetchOrdersFailure 
} from "../../store/reducers/orderReducer";
import { Table, Button, Group, Badge, Text, LoadingOverlay } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  
  const loadOrders = async () => {
    try {
      dispatch(fetchOrdersStart());
      const data = await fetchOrders();
      dispatch(fetchOrdersSuccess(Array.isArray(data) ? data : []));
    } catch (err) {
      dispatch(fetchOrdersFailure(err.message));
    }
  };
  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  if (loading) return <LoadingOverlay visible />;
  if (error) return <Text color="red">Error: {error}</Text>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button 
          component={Link} 
          to="/orders/create" 
          leftSection={<IconPlus size={16} />}
        >
          Create Order
        </Button>
      </div>

      {orders && orders.length > 0 ? (
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Order ID</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Items</Table.Th>
              <Table.Th>Discount</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th>Grand Total</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders.map((order) => (
              <Table.Tr key={order.id}>
                <Table.Td>#{order.id}</Table.Td>
                <Table.Td>{order.customerId || 'N/A'}</Table.Td>
                <Table.Td>{dayjs(order.createdAt).format("MMM D, YYYY")}</Table.Td>
                <Table.Td>{order.items?.length || 0}</Table.Td>
                <Table.Td>${order.discount?.toFixed(2) || '0.00'}</Table.Td>
                <Table.Td>${order.total?.toFixed(2) || '0.00'}</Table.Td>
                <Table.Td>${order.grandTotal?.toFixed(2) || '0.00'}</Table.Td>
                <Table.Td>
                  <Badge color="green">Completed</Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <Text>No orders found</Text>
      )}
    </div>
  );
};

export default OrderList;