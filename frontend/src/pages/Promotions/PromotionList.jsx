import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPromotions,
  togglePromotionStatus,
} from "../../services/promotionService";
import {
  fetchPromotionsStart,
  fetchPromotionsSuccess,
  fetchPromotionsFailure,
  togglePromotionStatusSuccess,
} from "../../store/reducers/promotionReducer";
import {
  Table,
  Button,
  Group,
  Badge,
  Text,
  Tooltip,
  LoadingOverlay,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconPlus,
  IconEdit,
  IconToggleRight,
  IconCalendar,
} from "@tabler/icons-react";
import dayjs from "dayjs";

const PromotionList = () => {
  const dispatch = useDispatch();
  const { promotions, loading, error } = useSelector(
    (state) => state.promotion
  );

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        dispatch(fetchPromotionsStart());
        const data = await fetchPromotions();
        dispatch(fetchPromotionsSuccess({ data, pagination: {} }));
      } catch (err) {
        dispatch(fetchPromotionsFailure(err.message));
      }
    };

    loadPromotions();
  }, [dispatch]);

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      await togglePromotionStatus(id);
      dispatch(togglePromotionStatusSuccess({ id, enabled: !currentStatus }));
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  if (loading) return <LoadingOverlay visible />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promotions</h1>
        <Group>
          <Button
            component={Link}
            to="/promotions/create"
            leftSection={<IconPlus size={16} />}
          >
            Create Promotion
          </Button>
        </Group>
      </div>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Dates</Table.Th>
            <Table.Th>Slabs</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {promotions.map((promotion) => (
            <Table.Tr key={promotion.id}>
              <Table.Td>{promotion.title}</Table.Td>
              <Table.Td>
                <Badge color="blue" variant="light">
                  {promotion.type}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Tooltip label="Start date">
                    <Badge leftSection={<IconCalendar size={12} />}>
                      {dayjs(promotion.startDate).format("MMM D, YYYY")}
                    </Badge>
                  </Tooltip>
                  <Text>to</Text>
                  <Tooltip label="End date">
                    <Badge leftSection={<IconCalendar size={12} />}>
                      {dayjs(promotion.endDate).format("MMM D, YYYY")}
                    </Badge>
                  </Tooltip>
                </Group>
              </Table.Td>
              <Table.Td>{promotion.slabs?.length || 0} slabs</Table.Td>
              <Table.Td>
                <Badge color={promotion.enabled ? "green" : "red"}>
                  {promotion.enabled ? "Active" : "Inactive"}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group>
                  <Button
                    variant="subtle"
                    size="sm"
                    component={Link}
                    to={`/promotions/edit/${promotion.id}`}
                    leftSection={<IconEdit size={14} />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="subtle"
                    size="sm"
                    color={promotion.enabled ? "red" : "green"}
                    onClick={() =>
                      handleStatusToggle(promotion.id, promotion.enabled)
                    }
                    leftSection={<IconToggleRight size={14} />}
                  >
                    {promotion.enabled ? "Disable" : "Enable"}
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

export default PromotionList;
