import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'dva'
import styled from 'styled-components'

import { AppState } from '../../models/appState'
import { Table, Popconfirm } from 'antd'
import { User } from '../../models/users'

class UserTable extends Table<User> {
}

const Wrapper = styled.div`
`
// const Create = styled.span`
//   margin-bottom: 1.5em;
// `
const Operation = styled.span`
  margin: 0.5em;
`

const Count: React.SFC<{
  list: Array<User>
  loading: boolean
  total: number
  page: number
  dispatch: Dispatch<AppState>
}> = ({ list: dataSource, loading, total, page: current, dispatch }) => {

  function deleteUser(id: number) {
    dispatch({
      type: 'users/remove',
      payload: id
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
      key: 'website'
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <Operation>
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
      <UserTable
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id.toString()}
        pagination={false}
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