import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useAuth } from '../../hooks/useAuth'
import s from './ProfilePage.module.css'
import { UploadInput } from '../../components/UploadInput/UploadInput'
import { useRef, useState } from 'react'
import { useInput } from '../../hooks/useInput'
import { Textarea } from '../../components/UI/Textarea/Textarea'
import FolderIcon from './../../assets/icons/folder.svg?react'

export const ProfilePage = () => {
    const { isAuth } = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userAbout = useInput("", { isEmpty: true, maxLength: 150 })
    const userNickname = useInput("", { maxLength: 20 })
    const recipeIngredients = useInput("", { maxLength: 1500, isEmpty: true })
    const [imageFile, setImageFile] = useState<null | File>(null)
    const recipesSteps = useInput("", { maxLength: 1500, isEmpty: true })
    const [isImageLoaded, setIsImageLoaded] = useState(true)

    const userAboutRef = useRef<HTMLTextAreaElement | null>(null)
    const userNicknameRef = useRef<HTMLTextAreaElement | null>(null)
    const uploadInputRef = useRef<HTMLInputElement | null>(null)
    const recipeIngredientsRef = useRef<HTMLTextAreaElement | null>(null)
    const recipesStepsRef = useRef<HTMLTextAreaElement | null>(null)
    const submitBtnRef = useRef<HTMLButtonElement>(null)
    const uploadInputWrap = useRef<HTMLDivElement | null>(null)


    const uploadFile = (file: File) => {
        if (file) {
          setImageFile(file)
        }
    }

    
    
    return(
        <div className={s.generalDiv}>
            <div className={s.uploadDiv}>
                <UploadInput uploadFile={uploadFile} ref={uploadInputRef} />
            </div>

            <div className={s.nicknameDiv}>
                <p className={s.title}>Nickname</p>
                <div className={s.inputDiv}>
                    <Textarea
                        {...userNickname}
                        allowedSymbols={30}
                        placeholder="Введите никнейм"
                        height={50}
                        ref={userNicknameRef}
                    />
                </div>
            </div>


            <div className={s.aboutDiv}>
                <p className={s.title}>О себе</p>
                <div>
                    <Textarea
                        {...userAbout}
                        allowedSymbols={1500}
                        placeholder="Расскажите немного о себе"
                        height={335}
                        ref={userAboutRef}
                    />
                </div>
            </div>

            <div className={s.nicknameDiv}>
                <p className={s.title}>Мои рецепты</p>
                <FolderIcon className={s.folderIcon}/>
            </div>

        </div>
    )
}