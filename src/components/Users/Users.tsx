import { Button, Pagination, Popconfirm, Table } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import * as React from 'react'
import { Dispatch } from 'redux'
import styled from 'styled-components'

import { PAGE_SIZE } from '../../constants'
import { AppState } from '../../models/appState'
import { User } from '../../models/users'
import { default as UserModal } from './UserModal'

class UserTable extends Table<User> {
}

const Wrapper = styled.div`
  margin-top: 0.5em;
`
const Operation = styled.span`
  margin: 0.5em;
`
const StyledButton = styled(Button)`
  margin-bottom: 0.5em !important;
`
const StyledPagination = styled(Pagination)`
  margin-top: 0.5em;
  float: right;
`

const Count: React.SFC<{
  list: Array<User>
  loading: boolean
  total: number
  page: number
  dispatch: Dispatch<AppState>
}> = ({ list: dataSource, loading, total, page: current, dispatch }) => {

  function changePagination(page: number) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page }
    }))
  }

  function deleteUser(id: number) {
    dispatch({
      type: 'users/remove',
      payload: id
    })
  }

  function editUser(id: number, values: User) {
    dispatch({
      type: 'users/patch',
      payload: { id, values }
    })
  }

  function createUser(values: User) {
    dispatch({
      type: 'users/create',
      payload: values
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="/#/users">{text}</a>
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: text => <a href={`http://${text}`}>{text}</a>
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <Operation>
          <UserModal record={record} onOk={(values) => editUser(record.id, values)}>
            <a>Edit </a>
          </UserModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={() => deleteUser(record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </Operation>
      )
    }
  ]

  return (
    <Wrapper>
      <UserModal
        record={{}}
        onOk={(values) => createUser(values)}
      >
        <StyledButton type="primary">Create User</StyledButton>
      </UserModal>
      <UserTable
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id.toString()}
        pagination={false}
      />
      <StyledPagination
        total={total}
        current={current}
        pageSize={PAGE_SIZE}
        pageSizeOptions={[PAGE_SIZE.toString()]}
        onChange={(page) => changePagination(page)}
      />
    </Wrapper>
  )
}

export default connect(
  ({ users: { list, page, total }, loading }: AppState) => ({
    loading: loading.models.users,
    list,
    page,
    total
  })
)(Count)