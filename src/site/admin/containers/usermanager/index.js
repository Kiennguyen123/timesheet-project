import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "@admin/components/admin";
import actionUsermanager from "@actions/usermanager";
import Table from "@components/common/Table";
import Card from "@components/common/Card";
import SelectSize from "@components/common/SelectSize";
import Pagination from "@components/common/Pagination";
import { Form, Button, Select, Tooltip } from "antd";
import ic_reset from "@images/icon/ic_reset.png";
const { Option } = Select;
function index(props) {
  const onSizeChange = size => {
    props.onSizeChange(size);
  };

  const onPageChange = page => {
    props.gotoPage(page);
  };

  useEffect(() => {
    props.onSearch("", -1);
  }, []);

  let data = (props.data || []).map((item, index) => {
    return {
      key: index,
      col1: (props.page - 1) * props.size + index + 1,
      col2: item.name,
      col3: item.active,
      col4: item.phone,
      col5: item.email,
      col6: item.role,
      col7: item,
    };
  });

  return (
    <AdminPage
      className="mgr-user"
      icon="subheader-icon fal fa-window"
      header="Quản lý danh mục tài khoản"
      subheader="Danh sách tài khoản nhân viên trong công ty"
    >
      <Panel
        id={"mgr-user"}
        allowClose={false}
        allowCollapse={false}
        toolbar={
          <div className="toolbar">
            <Button className="button">
              Thêm mới
            </Button>
          </div>
        }
      >
        <Table
          scroll={{ x: 800, y: 500 }}
          style={{ marginLeft: -10, marginRight: -10 }}
          className="custom"
          columns = {[
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">STT</div>
                  <div className="addition-box"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#000"
                    }}
                  ></div>
                </div>
              ),
              width: 100,
              dataIndex: "col1",
              key: "col1"
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Tên nhân viên</div>
                  <div className="addition-box">
                    <div className="search-box">
                      <img src={require("@images/icon/ic-search.png")} />
                      <input
                        // value={props.searchName}
                        // onChange={e =>
                        //   props.onSearch(e.target.value, props.searchActive)
                        // }
                        placeholder="Tìm theo tên nhân viên"
                      />
                    </div>
                  </div>
                </div>
              ),
              width: 300,
              dataIndex: "col2",
              key: "col2"
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Trạng thái</div>
                  <div className="addition-box"

                    >
                    <Select
                    style={{width:"80%"}}
                      // value={props.searchActive}
                      // onChange={e => {
                      //   props.onSearch(props.searchName, e);
                      // }}
                      defaultValue="TẤT CẢ"
                    >
                      <Option value={-1}>TẤT CẢ</Option>
                      <Option value={1}>ACTIVE</Option>
                      <Option value={0}>INACTIVE</Option>
                    </Select>
                  </div>
                </div>
              ),
              width: 200,
              dataIndex: "col3",
              key: "col3",
              render: item => {
                if (item == 1)
                  return (
                    <label href="#" class="badge badge-success">
                      Active
                    </label>
                  );
                return (
                  <label href="#" class="badge badge-danger">
                    InActive
                  </label>
                );
              }
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Số điện thoại</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 200,
              dataIndex: "col4",
              key: "col4"
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Email</div>
                  <div className="addition-box">
                    <div className="search-box">
                      <img src={require("@images/icon/ic-search.png")} />
                      <input
                        // value={props.searchName}
                        // onChange={e =>
                        //   props.onSearch(e.target.value, props.searchActive)
                        // }
                        placeholder="Tìm theo email"
                      />
                    </div>
                  </div>
                </div>
              ),
              width: 200,
              dataIndex: "col5",
              key: "col5"
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Quyền truy cập</div>
                  <div className="addition-box"></div>
                </div>
              ),
              align: 'center',
              width: 200,
              dataIndex: "col6",
              key: "col6"
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box"></div>
                  <div className="addition-box"></div>
                </div>
              ),
              key: "operation",
              fixed: "right",
              width: 150,
              render: item => {
                return (
                  <div className="col-action">
                    <Tooltip placement="topLeft" title={"Xem chi tiết"}>
                      <div>
                        <a
                          // onClick={viewDetail(item)}
                          class="btn btn-info btn-icon waves-effect waves-themed"
                        >
                          <i class="fal fa-eye"></i>
                        </a>
                      </div>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"Sửa"}>
                      <div>
                        <a
                          // onClick={editItem(item)}
                          class="btn btn-info btn-icon waves-effect waves-themed"
                        >
                          <i class="fal fa-edit"></i>
                        </a>
                      </div>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"Xóa"}>
                      <div>
                        <a
                          // onClick={onDeleteItem(item)}
                          class="btn btn-info btn-icon waves-effect waves-themed"
                        >
                          <i class="fal fa-trash-alt"></i>
                        </a>
                      </div>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"Reset password"}>
                        <div>
                          <a
                            // onClick={() => duyetDungCu(item)}
                            className="btn btn-info btn-icon waves-effect waves-themed"
                          >
                            <img className="" style={{maxWidth: "16px"}} src={ic_reset}  alt=""></img>
                          </a>
                        </div>
                      </Tooltip>
                  </div>
                );
              },
              dataIndex: "col7",
              key: "col7"
            }
          ]}
          dataSource={data}
        ></Table>
        <div className="footer">
          <SelectSize value={props.size} selectItem={onSizeChange} />
          <Pagination
            onPageChange={onPageChange}
            page={props.page}
            size={props.size}
            total={props.total}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        </div>
      </Panel>
    </AdminPage>
  )
}

export default connect(
  state => {
    debugger
    return {
      auth: state.auth.auth,
      data: state.usermanager.data || [],
      size: state.usermanager.size || 10,
      page: state.usermanager.page || 1,
      total: state.usermanager.total || 0,
      // searchName: state.user.searchName,
      // searchActive: state.user.searchActive
    };
  },
  {
    onSearch: actionUsermanager.onSearch,
    onPageChange: actionUsermanager.onPageChange,
    onSizeChange: actionUsermanager.onSizeChange,

  }
)(index);
