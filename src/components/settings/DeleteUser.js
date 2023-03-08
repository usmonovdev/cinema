import React, { useState } from 'react'
import { Popover } from 'antd'
import { MdOutlineDelete } from 'react-icons/md'
import { DeleteAccount } from '../../assets/AntD'
import Delete from './Delete'

function DeleteUser() {
    const [open, setOpen] = useState(false)
    const hide = () => {
        setOpen(false)
    }

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen)
    }
    return (
        <Popover
            content={<Delete hide={hide} />}
            title={<DeleteAccount/>}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <div className='delete'>
                <p>Delete Account</p>
                <MdOutlineDelete />
            </div>
        </Popover>
    )
}

export default DeleteUser