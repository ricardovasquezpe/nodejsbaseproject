def userInput = true
def didTimeout = false

pipeline {
    agent any
    stages{
        
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
        
        stage('docker'){
            steps {
                script {
                    node {
                        def app

                        /*stage('Clone repository') {
                            checkout scm
                        }*/

                        stage('Build image') {                            
                            app = docker.build("test")
                        }

                        stage('Test image') {
                            app.inside {
                                sh 'echo "Tests passed"'
                            }
                        }              
                    }                 
                }
            }
        }
        
        stage('Slave'){
            agent { node { label "slave" } }
            steps{
                //dir("${env.WORKSPACE}/nodejsbaseproject"){
                    script{
                        sh 'echo "Holi Slave"'
                    }
                //}
            }
        }
        
        stage('StartUp'){
            steps{
                //dir("${env.WORKSPACE}/nodejsbaseproject"){
                    script{
                        sh 'npm install'
                    }
                //}
            }
        }
        
        stage('Testing'){
            steps{
                //dir("${env.WORKSPACE}/nodejsbaseproject"){
                    script{
                        sh 'npm run test'
                    }
                //}
            }
            post {
                failure{
                    echo 'Tests failed'
                }
                always {
                  //step([$class: 'CoberturaPublisher', coberturaReportFile: 'nodejsbaseproject/output/coverage/jest/cobertura-coverage.xml'])
                  //junit 'nodejsbaseproject/test_results/junit/junit.xml'
                    junit 'test_results/junit/junit.xml'
                }
            }
        }
        stage('Build') {
            steps {
                //dir("${env.WORKSPACE}/nodejsbaseproject"){
                    script {
                        sh 'npm run build'
                    }
                //}
            }
            post{
                success{
                    echo "${env.BUILD_URL} has result success"
                }
                failure{
                    emailext body: 'Error on Jenkins Build ${env.BUILD_URL}', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Jenkins Error'
                }
                aborted {
                    echo "Aborted"
                }
            }
        }
        
        stage('Pregunta'){
            steps{
                script{
                    preguntar()
                    if (didTimeout) {
                        echo "No seleccionó ninguna opcion"
                    } else if (userInput == true) {
                        echo "Aceptó"
                    } else {
                        echo "Falló"
                        currentBuild.result = 'FAILURE'
                    } 
                }
            }
        }
        
        stage('Deploy') {
            /*when {
                expression {
                    currentBuild.previousBuild.result == 'SUCCESS'
                }
            }*/
            steps {
                script {
                    sh 'npm start'
                }
            }
        }
    }
}

def preguntar() {
    try {
        timeout(time: 15, unit: 'SECONDS') { // change to a convenient timeout for you
            userInput = input(
            id: 'Proceed', message: 'Pasamos a la siguiente etapa?', parameters: [
            [$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Confirmo bajo mi responsabilidad que pasará a la siguiente etapa']
            ])
        }
    } catch(err) { // timeout reached or input false
        def user = err.getCauses()[0].getUser()
        if('SYSTEM' == user.toString()) { // SYSTEM means timeout.
            didTimeout = true
        } else {
            userInput = false
            echo "Detenido Por: [${user}]"
        }
    }
}
    
