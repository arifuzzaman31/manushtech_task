import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  toggleProductStatus,
} from "../../services/productService";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  toggleProductStatusSuccess,
} from "../../store/reducers/productReducer";
import {
  Table,
  Button,
  Group,
  Badge,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconPlus,
  IconSearch,
  IconEdit,
  IconToggleRight,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, pagination } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch(fetchProductsStart());
        const data = await fetchProducts(pagination.page, pagination.perPage);
        dispatch(fetchProductsSuccess(data));
      } catch (err) {
        dispatch(fetchProductsFailure(err.message));
      }
    };

    loadProducts();
  }, [dispatch, pagination.page, pagination.perPage]);

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      await toggleProductStatus(id, !currentStatus);
      dispatch(toggleProductStatusSuccess({ id, enabled: !currentStatus }));

      notifications.show({
        title: "Success",
        message: `Product ${
          !currentStatus ? "activated" : "deactivated"
        } successfully`,
        color: `${!currentStatus ? "green" : "red"}`,
      });
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  if (loading) return <LoadingOverlay visible />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Group>
          <TextInput
            placeholder="Search products..."
            rightSection={<IconSearch size={16} />}
          />
          <Button
            component={Link}
            to="/products/create"
            leftSection={<IconPlus size={16} />}
          >
            Add Product
          </Button>
        </Group>
      </div>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Weight</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {products.map((product) => (
            <Table.Tr key={product?.id}>
              <Table.Td>{product?.name}</Table.Td>
              <Table.Td>{product?.description}</Table.Td>
              <Table.Td>${product?.price?.toFixed(2)}</Table.Td>
              <Table.Td>{product?.weight} kg</Table.Td>
              <Table.Td>
                <Badge color={product.enabled ? "green" : "red"}>
                  {product.enabled ? "Active" : "Inactive"}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group>
                  <Button
                    variant="subtle"
                    size="sm"
                    component={Link}
                    to={`/products/edit/${product.id}`}
                    leftSection={<IconEdit size={14} />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="subtle"
                    size="sm"
                    color={product.enabled ? "red" : "green"}
                    onClick={() =>
                      handleStatusToggle(product.id, product.enabled)
                    }
                    leftSection={<IconToggleRight size={14} />}
                  >
                    {product.enabled ? "Deactivate" : "Activate"}
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default ProductList;
