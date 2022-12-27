import React, { useEffect } from "react";
import { Button, Empty, Modal, Radio } from "antd";
import { useState } from "react";
// import useEmployee from "../../hooks/use-employee";
import moment from "moment";
// import { getEmployeeByDate } from "../../api/employee";

const EmployeeModal = (props) => {
  const id = props.id;
  const date = props.date;
  // const date = "20220930";
  const [shiftName, setshiftName] = useState();
  const [shiftTimeStart, setshiftTimeStart] = useState();
  const [shiftTimeEnd, setShiftTimeEnd] = useState();
  const [shiftId, setshiftId] = useState();

  const [employee, setEmployee] = useState();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const dataUptoForm = {
    id,
    date,
    shiftId,
    shiftName,
    shiftTimeStart,
    shiftTimeEnd,
  };
  const ChildShiftID = (e) => {
    props.ParentShiftId(e);
  };
  const handleOk = () => {
    setOpen(false);
    // ---------------------------------
    ChildShiftID(dataUptoForm);
  };
  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setOpen(false);
  };

  const onChange = ({ target: { value } }) => {
    console.log("shift id:", value);
    setshiftId(value);
  };
  useEffect(() => {
    if (id !== "" && date !== "") {
      fetch(
        `http://localhost:5000/api/employee/get-employee-by-date?date=${date}&employee=${id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setEmployee(data), console.log(data);
        });
    }
  }, [date, id]);
  const convertDate = (date) => {
    var timestamp = moment.unix(date);
    return timestamp.format("DD/MM/YYYY");
  };

  // if (error) return <div>Request Failed</div>;
  // if (!employee) return <div>Loading...</div>;
  return (
    <div>
      <Button type="primary" style={{backgroundColor: '#00502b', border: 'none' }} onClick={showModal}>
       Danh sách ca làm
      </Button>
      <Modal
        title="Chọn giờ đến"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <div className="">
          {employee?.map((item) => (
            <div className="" key={item._id}>
              <div className="">
                <Radio.Group
                  // options={optionsWithDisabled}
                  onChange={onChange}
                  optionType="button"
                >
                  <div className="grid grid-cols-3">
                    {item.timeWork?.map((item2) => (
                      <div className="" key={item2._id}>
                        <Radio.Button
                          value={item2.shiftId._id}
                          onClick={() => {
                            setshiftName(item2.shiftId.shiftName),
                              setshiftTimeStart(item2.shiftId.timeStart),
                              setShiftTimeEnd(item2.shiftId.timeEnd);
                          }}
                        >
                          {item2.shiftId.shiftName}: {item2.shiftId.timeStart} -{" "}
                          {item2.shiftId.timeEnd}
                          {/* {convertDate(item2.date)} */}
                        </Radio.Button>
                      </div>
                    ))}
                  </div>
                </Radio.Group>
              </div>
            </div>
          ))}
          {!employee ? <Empty/>: ""}
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeModal;
