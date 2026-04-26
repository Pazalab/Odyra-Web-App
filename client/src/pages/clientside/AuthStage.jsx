import { useDispatch, useSelector } from 'react-redux'
import DataLoader from '../../components/clientside/common/spinners/DataLoader'
import { useGetAdminProfileQuery } from '../../redux/slices/admin/adminApiSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAdminProfile } from '../../redux/slices/admin/adminActionsSlice';

const AuthStage = () => {
    const { adminInfo } = useSelector(state => state.admin);
    const id = adminInfo && adminInfo.id;
    const { data, isLoading } = useGetAdminProfileQuery(id, { refetchOnMountOrArgChange: true})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
           if(data){
                dispatch(setAdminProfile({ ...data.profile }))
                const identifier = (data.profile.username && data.profile.username.trim() !== "") ? data.profile.username : id
                navigate(`/admin/${identifier}/dashboard`)
           }
    }, [data, dispatch, navigate, id])
  return (
    <div className='auth-stage'>
              <div className="auth-stage-wrapper">
                       { isLoading ? <DataLoader /> : 
                          <p></p>
                       }
              </div>
    </div>
  )
}

export default AuthStage